const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, '../public')));

// ── GAME ROOMS ────────────────────────────────────────────
// rooms[code] = { host, players, phase, category, submissions, listenOrder, listenIdx, votes, voteOrder, voteIdx, timer }
const rooms = {};

const CATEGORIES = [
  "🔥 Hype Anthems","💔 Heartbreak Hits","🎉 Party Bangers",
  "😤 Drill / Trap","🌊 Vibes Only","🕺 Old School",
  "💿 R&B Smooth","🎸 Rock Legends","🌍 Latin Heat","🤯 Hidden Gems"
];

function makeCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "A3F9C2"
}

function extractVideoId(url) {
  try {
    if (url.includes('youtu.be/')) {
      let id = url.split('youtu.be/')[1];
      return id.split('?')[0].split('&')[0];
    }
    if (url.includes('v=')) {
      let id = url.split('v=')[1];
      return id.split('&')[0].split('#')[0];
    }
  } catch(e) {}
  return null;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - .5);
}

function broadcastRoom(code) {
  const room = rooms[code];
  if (!room) return;
  io.to(code).emit('room_update', sanitizeRoom(room));
}

function sanitizeRoom(room) {
  // Don't expose who submitted what until results
  const safe = {
    code: room.code,
    phase: room.phase,
    players: room.players,
    host: room.host,
    category: room.category,
    listenOrder: room.listenOrder,
    listenIdx: room.listenIdx,
    voteIdx: room.voteIdx,
    voteOrder: room.voteOrder,
    submittedPlayers: Object.keys(room.submissions),
    votedPlayers: Object.keys(room.votes),
    timerSeconds: room.timerSeconds,
  };
  if (room.phase === 'results') {
    safe.submissions = room.submissions;
    safe.votes = room.votes;
    safe.tally = room.tally;
  }
  return safe;
}

// ── SOCKET HANDLERS ───────────────────────────────────────
io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  // CREATE ROOM
  socket.on('create_room', ({ name }) => {
    if (!name || !name.trim()) return;
    const code = makeCode();
    rooms[code] = {
      code,
      host: name.trim(),
      players: [{ name: name.trim(), id: socket.id }],
      phase: 'lobby',      // lobby | category | submit | listen | vote | results
      category: null,
      submissions: {},     // name -> url
      listenOrder: [],
      listenIdx: 0,
      voteOrder: [],
      voteIdx: 0,
      votes: {},           // voter -> votedFor
      tally: null,
      timerSeconds: 60,
      timerInterval: null,
    };
    socket.join(code);
    socket.data.room = code;
    socket.data.name = name.trim();
    socket.emit('room_created', { code });
    broadcastRoom(code);
    console.log(`Room ${code} created by ${name}`);
  });

  // JOIN ROOM
  socket.on('join_room', ({ code, name }) => {
    code = (code || '').toUpperCase().trim();
    name = (name || '').trim();
    const room = rooms[code];
    if (!room) { socket.emit('error', 'Room not found. Check the code!'); return; }
    if (room.phase !== 'lobby') { socket.emit('error', 'Game already started!'); return; }
    if (room.players.find(p => p.name === name)) { socket.emit('error', 'That name is taken in this room!'); return; }
    if (!name) { socket.emit('error', 'Enter your name!'); return; }

    room.players.push({ name, id: socket.id });
    socket.join(code);
    socket.data.room = code;
    socket.data.name = name;
    socket.emit('room_joined', { code });
    broadcastRoom(code);
    console.log(`${name} joined room ${code}`);
  });

  // START GAME (host only)
  socket.on('start_game', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room) return;
    if (socket.data.name !== room.host) { socket.emit('error', 'Only the host can start!'); return; }
    if (room.players.length < 2) { socket.emit('error', 'Need at least 2 players!'); return; }
    room.phase = 'category';
    broadcastRoom(code);
  });

  // PICK CATEGORY (host only)
  socket.on('pick_category', ({ category }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || socket.data.name !== room.host) return;
    room.category = category;
    room.phase = 'submit';
    broadcastRoom(code);
  });

  // SUBMIT SONG
  socket.on('submit_song', ({ url }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'submit') return;
    const vid = extractVideoId(url);
    if (!vid) { socket.emit('error', 'Invalid YouTube URL!'); return; }
    const name = socket.data.name;
    room.submissions[name] = url;

    broadcastRoom(code);

    // Check if everyone submitted
    if (room.players.every(p => room.submissions[p.name])) {
      room.listenOrder = shuffle(room.players.map(p => p.name));
      room.listenIdx = 0;
      room.phase = 'listen';
      broadcastRoom(code);
      startListenTimer(code);
    }
  });

  // VOTE
  socket.on('cast_vote', ({ votedFor }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'vote') return;
    const voter = socket.data.name;
    if (voter === votedFor) { socket.emit('error', "You can't vote for yourself!"); return; }
    if (room.votes[voter]) { socket.emit('error', 'You already voted!'); return; }

    room.votes[voter] = votedFor;
    broadcastRoom(code);

    // Check if everyone voted
    if (room.players.every(p => room.votes[p.name])) {
      finishGame(code);
    }
  });

  // NEXT TRACK (host skips timer)
  socket.on('next_track', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || socket.data.name !== room.host) return;
    advanceTrack(code);
  });

  // PLAY AGAIN (host)
  socket.on('play_again', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || socket.data.name !== room.host) return;
    clearTimerForRoom(code);
    room.phase = 'lobby';
    room.category = null;
    room.submissions = {};
    room.listenOrder = [];
    room.listenIdx = 0;
    room.votes = {};
    room.voteOrder = [];
    room.voteIdx = 0;
    room.tally = null;
    room.timerSeconds = 60;
    broadcastRoom(code);
  });

  // DISCONNECT
  socket.on('disconnect', () => {
    const code = socket.data.room;
    const name = socket.data.name;
    if (!code || !rooms[code]) return;
    const room = rooms[code];
    room.players = room.players.filter(p => p.id !== socket.id);
    if (room.players.length === 0) {
      clearTimerForRoom(code);
      delete rooms[code];
      console.log(`Room ${code} deleted (empty)`);
    } else {
      if (room.host === name && room.players.length > 0) {
        room.host = room.players[0].name;
        io.to(code).emit('notice', `${name} left. ${room.host} is the new host.`);
      }
      broadcastRoom(code);
    }
  });
});

// ── TIMER ─────────────────────────────────────────────────
function startListenTimer(code) {
  const room = rooms[code];
  if (!room) return;
  clearTimerForRoom(code);
  room.timerSeconds = 60;

  // Announce which song is playing
  const currentPlayer = room.listenOrder[room.listenIdx];
  const url = room.submissions[currentPlayer];
  io.to(code).emit('play_song', {
    url,
    idx: room.listenIdx,
    total: room.players.length,
    videoId: extractVideoId(url)
  });

  room.timerInterval = setInterval(() => {
    room.timerSeconds--;
    io.to(code).emit('timer_tick', { seconds: room.timerSeconds });
    if (room.timerSeconds <= 0) {
      advanceTrack(code);
    }
  }, 1000);
}

function advanceTrack(code) {
  const room = rooms[code];
  if (!room) return;
  clearTimerForRoom(code);
  room.listenIdx++;
  if (room.listenIdx < room.players.length) {
    room.phase = 'listen';
    broadcastRoom(code);
    startListenTimer(code);
  } else {
    room.phase = 'vote';
    broadcastRoom(code);
  }
}

function finishGame(code) {
  const room = rooms[code];
  if (!room) return;
  clearTimerForRoom(code);
  const counts = {};
  room.players.forEach(p => counts[p.name] = 0);
  Object.values(room.votes).forEach(v => { if (counts[v] !== undefined) counts[v]++; });
  room.tally = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  room.phase = 'results';
  broadcastRoom(code);
}

function clearTimerForRoom(code) {
  const room = rooms[code];
  if (room && room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }
}

// ── START SERVER ──────────────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎵 Aux Wars server running on port ${PORT}`);
});
