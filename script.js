// ===== DATA =====
const projects = [
  {id:1,year:2013,name:"a",desc:"b",beneficiaries:520,status:"done",icon:"🧥"},
  {id:2,year:2014,name:"a",desc:"b",beneficiaries:1200,status:"done",icon:"💧"},
  {id:3,year:2015,name:"a",desc:"b",beneficiaries:800,status:"done",icon:"👁"},
  {id:4,year:2016,name:"a",desc:"b",beneficiaries:3000,status:"done",icon:"🌊"},
  {id:5,year:2017,name:"a",desc:"b",beneficiaries:120,status:"done",icon:"📚"},
  {id:6,year:2018,name:"a",desc:"b",beneficiaries:60,status:"done",icon:"🏠"},
  {id:7,year:2019,name:"a",desc:"b",beneficiaries:200,status:"done",icon:"🔧"},
  {id:8,year:2020,name:"a",desc:"b",beneficiaries:5000,status:"done",icon:"😷"},
  {id:9,year:2021,name:"a",desc:"b",beneficiaries:10000,status:"done",icon:"🌳"},
  {id:10,year:2022,name:"a",desc:"b",beneficiaries:2000,status:"done",icon:"🏥"},
  {id:11,year:2023,name:"a",desc:"b",beneficiaries:300,status:"done",icon:"📱"},
  {id:12,year:2024,name:"a",desc:"b",beneficiaries:150,status:"ongoing",icon:"✏️"},
  {id:13,year:2025,name:"a",desc:"b",beneficiaries:4000,status:"ongoing",icon:"☀️"},
  {id:14,year:2026,name:"a",desc:"b",beneficiaries:8000,status:"ongoing",icon:"🛡"},
];

const mediaItems = {
  images:[
    {title:"a",desc:"b",type:"Offline",img:"https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/640956112_1353140776840837_466606770552390293_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=uLA5b9vCzXcQ7kNvwEOdMia&_nc_oc=Adoeuo-RoCn4UMhCMzyNy-7g2Rrg6XOS5YNhnUkRpKF_MOfdflMTISJCncimu8xR53E&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=SZSvc6CFKfN09yppmw4b2w&_nc_ss=7f2a8&oh=00_Af5h_4o0CrKTJRAYK_jCL_nTDNXSF0JgDCsy40ixtUfndw&oe=6A0145D7"},
    {title:"a",desc:"b",type:"Online",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgCPQmyPHrOWxnUvbmQIRwOipjW8woZUreA&s"},
    {title:"a",desc:"b",type:"Online",icon:"🌳"},
    {title:"a",desc:"b",type:"Offline",icon:"📦"},
    {title:"a",desc:"b",type:"Online",icon:"🎓"},
    {title:"a",desc:"b",type:"Offline",icon:"💧"},
  ],
  audio:[
    {title:"a",desc:"b",type:"Online",icon:"🎵"},
    {title:"a",desc:"b",type:"Offline",icon:"📻"},
    {title:"a",desc:"b",type:"Online",icon:"🎙"},
  ],
  "video-online":[
    {title:"a",desc:"b",type:"Online",icon:"▶"},
    {title:"a",desc:"b",type:"Online",icon:"🎬"},
    {title:"a",desc:"b",type:"Online",icon:"🎥"},
  ],
  "video-offline":[
    {title:"a",desc:"b",type:"Offline",icon:"📹"},
    {title:"a",desc:"b",type:"Offline",icon:"📼"},
  ],
  youtube:[
    {title:"a",desc:"b",type:"YouTube",icon:"▶"},
    {title:"a",desc:"b",type:"YouTube",icon:"🎞"},
    {title:"a",desc:"b",type:"YouTube",icon:"🔴"},
  ],
};

const researches = [
  {tag:"Poverty",title:"a",desc:"b"},
  {tag:"Health",title:"a",desc:"b"},
  {tag:"Education",title:"a",desc:"b"},
  {tag:"Environment",title:"a",desc:"b"},
  {tag:"Disaster",title:"a",desc:"b"},
  {tag:"Women",title:"a",desc:"b"},
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  buildYearDropdown();
  buildYearFilter();
  renderProjectTable('all');
  renderSwiper();
  renderMedia('images');
  renderSuggestGrid();
  renderResearch();
  populateDonateDropdowns();
  animateStats();
  setDefaultDate();
});

function buildYearDropdown() {
  const c = document.getElementById('yearDropdown');
  for(let y=2026;y>=2013;y--) {
    const d = document.createElement('div');
    d.className = 'dropdown-item';
    d.textContent = `📅 Year ${y}`;
    d.onclick = () => { smoothScroll('projects'); setTimeout(()=>filterByYear(y),400); };
    c.appendChild(d);
  }
}

function buildYearFilter() {
  const c = document.getElementById('yearFilter');
  const all = document.createElement('button');
  all.className = 'year-btn active'; all.textContent = 'All Years';
  all.onclick = () => { filterByYear('all'); setActiveYearBtn(all); };
  c.appendChild(all);
  for(let y=2013;y<=2026;y++) {
    const b = document.createElement('button');
    b.className = 'year-btn'; b.textContent = y;
    b.onclick = () => { filterByYear(y); setActiveYearBtn(b); };
    c.appendChild(b);
  }
}

function setActiveYearBtn(btn) {
  document.querySelectorAll('.year-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function filterByYear(y) {
  const filtered = y==='all' ? projects : projects.filter(p=>p.year==y);
  renderProjectTable(y, filtered);
}

function renderProjectTable(filter, data) {
  const rows = data || projects;
  const tbody = document.getElementById('projectTableBody');
  tbody.innerHTML = rows.map((p,i)=>`
    <tr>
      <td>${i+1}</td>
      <td><div class="project-img" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;">${p.icon}</div></td>
      <td><strong>${p.name}</strong></td>
      <td>${p.year}</td>
      <td style="max-width:300px;">${p.desc}</td>
      <td><span class="status-badge ${p.status==='done'?'status-done':'status-ongoing'}">${p.status==='done'?'✅ Completed':'🔄 Ongoing'}</span></td>
      <td>${p.beneficiaries.toLocaleString()}</td>
    </tr>
  `).join('');
}

// ===== SWIPER =====
let swiperIndex = 0;
const swiperProjects = projects.slice(-6).reverse();

function renderSwiper() {
  const track = document.getElementById('swiperTrack');
  track.innerHTML = swiperProjects.map((p,i)=>`
    <div class="swiper-card" id="sc${i}">
      <div class="card-img">${p.icon}</div>
      <div class="card-body">
        <div class="card-year">${p.year}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
      </div>
    </div>
  `).join('');
  updateSwiper();
}

function updateSwiper() {
  const cards = document.querySelectorAll('.swiper-card');
  const n = cards.length;
  cards.forEach((c,i) => {
    const offset = ((i - swiperIndex + n) % n);
    let tx, tz, scale, zIndex, opacity;
    if(offset === 0) { tx=0; tz=0; scale=1; zIndex=10; opacity=1; }
    else if(offset === 1) { tx=360; tz=-100; scale=.82; zIndex=8; opacity=.8; }
    else if(offset === n-1) { tx=-360; tz=-100; scale=.82; zIndex=8; opacity=.8; }
    else if(offset === 2) { tx=560; tz=-250; scale=.65; zIndex=6; opacity=.5; }
    else if(offset === n-2) { tx=-560; tz=-250; scale=.65; zIndex=6; opacity=.5; }
    else { tx=0; tz=-400; scale=.5; zIndex=1; opacity:0; }
    c.style.transform = `translate(calc(-50% + ${tx}px), -50%) translateZ(${tz}px) scale(${scale})`;
    c.style.zIndex = zIndex;
    c.style.opacity = opacity;
  });
}

function swiperMove(dir) {
  swiperIndex = (swiperIndex + dir + swiperProjects.length) % swiperProjects.length;
  updateSwiper();
}

// Auto-swipe
setInterval(()=>swiperMove(1), 4000);

// ===== MEDIA =====
function renderMedia(type) {
  const g = document.getElementById('mediaGrid');
  const items = mediaItems[type] || [];
  g.innerHTML = items.map(m=>`
    <div class="media-card">
      <div class="card-img" style="height:160px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,var(--green),var(--gold));color:#fff;">
        ${m.img
          ? `<img src="${m.img}" alt="${m.title}" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML='${m.icon||'🖼'}'"/>`
          : m.icon || '🖼'}
      </div>
      <div class="media-card-body">
        <span class="media-type">${m.type}</span>
        <h4>${m.title}</h4>
        <p>${m.desc}</p>
        <button class="btn btn-outline" style="margin-top:8px;padding:5px 14px;font-size:.78rem;" onclick="alert('${type==='youtube'?'Opening YouTube...':'Playing '+m.title}')">
          ${type==='images'?'<i class="fas fa-expand"></i> View':type==='audio'?'<i class="fas fa-play"></i> Play':'<i class="fas fa-play"></i> Watch'}
        </button>
      </div>
    </div>
  `).join('');
}

function switchTab(el, type) {
  document.querySelectorAll('.media-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  renderMedia(type);
}

// ===== SUGGEST GRID =====
function renderSuggestGrid() {
  const ongoing = projects.filter(p=>p.status==='ongoing');
  const g = document.getElementById('suggestGrid');
  g.innerHTML = ongoing.map(p=>{
    const pct = Math.floor(Math.random()*70)+20;
    return `
    <div class="suggest-card">
      <div class="suggest-card-top"></div>
      <div class="suggest-card-body">
        <div class="tag tag-gold" style="margin-bottom:10px;">${p.year}</div>
        <h4>${p.icon} ${p.name}</h4>
        <p>${p.desc}</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="progress-text"><span>${pct}% funded</span><span>Goal: ৳${(p.beneficiaries*50).toLocaleString()}</span></div>
        <button class="btn btn-gold" style="width:100%;justify-content:center;padding:10px;" onclick="document.getElementById('dProject').value='${p.name}';smoothScroll('donate-section')"><i class="fas fa-hand-holding-usd"></i> Donate to This</button>
      </div>
    </div>`;
  }).join('');
}

// ===== RESEARCH =====
function renderResearch() {
  const g = document.getElementById('researchGrid');
  g.innerHTML = researches.map(r=>`
    <div class="research-card">
      <span class="research-tag">${r.tag}</span>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <button class="btn btn-outline" style="margin-top:14px;padding:6px 16px;font-size:.8rem;" onclick="alert('Full paper coming soon!')"><i class="fas fa-file-pdf"></i> Read Paper</button>
    </div>
  `).join('');
}

// ===== DONATE DROPDOWNS =====
function populateDonateDropdowns() {
  const opts = projects.map(p=>`<option value="${p.name}">${p.year} — ${p.name}</option>`).join('');
  document.getElementById('dProject').innerHTML = '<option value="">— Choose a project —</option>' + opts;
  document.getElementById('dProjectModal').innerHTML = '<option value="">— Choose a project —</option>' + opts;
}

// ===== STATS ANIMATION =====
function animateStats() {
  const stats = [
    {id:'statProjects', target:14, suffix:''},
    {id:'statBenef', target:35, suffix:'K+'},
    {id:'statMembers', target:500, suffix:'+'},
    {id:'statYears', target:12, suffix:'+'},
  ];
  stats.forEach(s=>{
    let val=0;
    const el=document.getElementById(s.id);
    const step = Math.ceil(s.target/60);
    const t = setInterval(()=>{
      val = Math.min(val+step, s.target);
      el.textContent = val + s.suffix;
      if(val>=s.target) clearInterval(t);
    }, 30);
  });
}

// ===== PAYMENT =====
let selectedPayMethod = '';
function selectPay(el, method) {
  el.closest('.payment-methods').querySelectorAll('.pay-method').forEach(m=>m.classList.remove('selected'));
  el.classList.add('selected');
  selectedPayMethod = method;
}

// ===== DONATE SUBMIT =====
function submitDonate() {
  const name = document.getElementById('dName').value || 'Anonymous';
  const project = document.getElementById('dProject').value;
  const amount = document.getElementById('dAmount').value;
  if(!project || !amount) { alert('Please select a project and enter amount.'); return; }
  if(!selectedPayMethod) { alert('Please select a payment method.'); return; }
  alert(`🤲 Thank you, ${name}!\n\nDonation: ৳${amount} via ${selectedPayMethod.toUpperCase()}\nProject: ${project}\n\nMay Allah bless you for your generosity. ADHASO will contact you shortly.`);
}

// ===== REGISTRATION =====
function toggleSpouse(show) {
  document.getElementById('spouseNameGroup').style.display = show ? 'block' : 'none';
}

function submitRegistration() {
  const name = document.getElementById('rName').value;
  const email = document.getElementById('rEmail').value;
  if(!name || !email) { alert('Please fill in required fields.'); return; }
  // Simulate Excel export
  const data = {
    name, email,
    phone1: document.getElementById('rCC1').value + document.getElementById('rPhone1').value,
    phone2: document.getElementById('rCC2').value + document.getElementById('rPhone2').value,
    nationality: document.getElementById('rNationality').value,
    gender: document.getElementById('rGender').value,
    father: document.getElementById('rFather').value,
    mother: document.getElementById('rMother').value,
    spouse: document.getElementById('rSpouse')?.value || 'N/A',
    school: document.getElementById('rSchool').value,
    college: document.getElementById('rCollege').value,
    university: document.getElementById('rUniversity').value,
    memberType: document.getElementById('rMType').value,
    registeredAt: new Date().toISOString(),
  };
  console.log('Registration data (would export to Excel):', data);
  // Generate CSV for download (simulating Excel connection)
  const csv = Object.keys(data).join(',') + '\n' + Object.values(data).join(',');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=`adhaso_reg_${name.replace(' ','_')}.csv`; a.click();
  alert(`✅ Registration successful, ${name}!\n\nWelcome to ADHASO family. A confirmation email will be sent to ${email}.\n\nYour data has been saved.`);
  closeModal('regModal');
}

// ===== LOGIN =====
function submitLogin() {
  const email = document.getElementById('lEmail').value;
  const pass = document.getElementById('lPass').value;
  if(!email || !pass) { alert('Please enter email and password.'); return; }
  alert(`✅ Welcome back! Signing in as ${email}...`);
  closeModal('loginModal');
}

// ===== INFO MODAL =====
const infoData = {
  chairman: {title:'Board of Trustees — Chairman', body:'<p>The Chairman heads the Board of Trustees and provides strategic guidance to ADHASO. The Chairman oversees all major decisions and is elected by the General Assembly every 3 years.</p>'},
  trustees: {title:'Board of Trustees', body:'<p>The Board of Trustees consists of 7 elected members who oversee the governance and long-term strategy of ADHASO. They meet quarterly and review all financial and programmatic decisions.</p>'},
  executives: {title:'Executive Committee', body:'<p>The Executive Committee manages day-to-day operations. Members include President, Vice President, Secretary, Joint Secretary, and Treasurer.</p>'},
  'sub-executives': {title:'Sub-Executive Members', body:'<p>Sub-executives assist department heads and handle specific portfolios such as Education, Health, Environment, and Community Outreach.</p>'},
  'gen-volunteers': {title:'General Volunteers', body:'<p>Our 200+ general volunteers are the backbone of every project. They participate in field work, community events, and distribution drives.</p>'},
  'supportive-volunteers': {title:'Supportive Volunteers', body:'<p>Supportive volunteers contribute skills like photography, design, IT, and logistics — supporting from behind the scenes.</p>'},
  'special-members': {title:'Special Members', body:'<p>Special members include renowned professionals and public figures who lend their expertise and influence to advance ADHASO\'s mission.</p>'},
  'general-members': {title:'General Members', body:'<p>General members are the core of our community. They pay annual dues and participate in all programs and voting activities.</p>'},
  'supportive-members': {title:'Supportive Members', body:'<p>Supportive members contribute financially or in-kind on a regular basis, enabling our programs to sustain and grow.</p>'},
  probashi: {title:'Probashi Members (Diaspora)', body:'<p>Our Probashi members are Bangladeshis living abroad — in the UK, USA, Middle East, Australia, and beyond — who support ADHASO through donations, advocacy, and international partnerships.</p>'},
};

function openInfo(key) {
  const d = infoData[key];
  if(!d) return;
  document.getElementById('infoModalTitle').textContent = d.title;
  document.getElementById('infoModalBody').innerHTML = d.body + `<div style="margin-top:20px;text-align:center;"><button class="btn btn-green" onclick="closeModal('infoModal')">Close</button></div>`;
  openModal('infoModal');
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if(e.target===m) { m.classList.remove('open'); document.body.style.overflow=''; } });
});

// ===== SCROLL =====
function smoothScroll(id) { document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}); }

// ===== MOBILE NAV =====
function toggleMobileNav() {
  const n = document.getElementById('mobileNav');
  n.style.display = n.style.display==='none' ? 'block' : 'none';
}

// ===== SEARCH =====
const searchContent = [
  {title:'About ADHASO', desc:'Learn about our mission and vision', section:'about'},
  {title:'Winter Clothing Drive 2013', desc:'Free winter clothes distribution project', section:'projects'},
  {title:'Medical Camp 2022', desc:'Free health camp project', section:'projects'},
  {title:'Donate Now', desc:'Support our ongoing projects', section:'donate-section'},
  {title:'Contact Us', desc:'Get in touch with ADHASO', section:'contact'},
  {title:'Executive Attendance', desc:'Mark attendance for meetings', section:'attendance'},
  {title:'Research Publications', desc:'Our research and studies', section:'research'},
  {title:'Media Gallery', desc:'Photos, videos and audio', section:'media'},
  ...projects.map(p=>({title:p.name, desc:`${p.year} project — ${p.desc.substring(0,60)}...`, section:'projects'})),
];

document.getElementById('searchInput').addEventListener('input', function() { doSearch(this.value); });
document.getElementById('searchInput').addEventListener('keydown', function(e) { if(e.key==='Enter') doSearch(this.value,true); });
document.getElementById('searchBtn').addEventListener('click', function() { doSearch(document.getElementById('searchInput').value, true); });

function doSearch(q, navigate=false) {
  const res = document.getElementById('searchResults');
  if(!q || q.length < 2) { res.style.display='none'; return; }
  const found = searchContent.filter(c => c.title.toLowerCase().includes(q.toLowerCase()) || c.desc.toLowerCase().includes(q.toLowerCase())).slice(0,8);
  if(found.length===0) { res.style.display='block'; res.innerHTML='<p style="padding:10px;font-size:.85rem;color:var(--text-soft);">No results found.</p>'; return; }
  if(navigate && found.length > 0) { smoothScroll(found[0].section); res.style.display='none'; return; }
  res.style.display='block';
  res.innerHTML = found.map(f=>`
    <div class="search-result-item" onclick="smoothScroll('${f.section}');document.getElementById('searchResults').style.display='none';document.getElementById('searchInput').value='';">
      <h5>${f.title}</h5>
      <p>${f.desc}</p>
    </div>
  `).join('');
}

document.addEventListener('click', e => {
  if(!e.target.closest('#searchResults') && !e.target.closest('.search-wrap'))
    document.getElementById('searchResults').style.display='none';
});

// ===== DATE DEFAULT =====
function setDefaultDate() {
  const d = document.getElementById('attDate');
  if(d) d.value = new Date().toISOString().split('T')[0];
}

// ===== KEYBOARD ESC =====
document.addEventListener('keydown', e => {
  if(e.key==='Escape') { document.querySelectorAll('.modal-overlay.open').forEach(m=>{ m.classList.remove('open'); document.body.style.overflow=''; }); }
});


// ===== ATTENDANCE =====
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const attMonth=document.getElementById('attMonth');
months.forEach((m,i)=>{const o=document.createElement('option');o.value=i;o.textContent=m+' 2026';attMonth.appendChild(o);});
attMonth.value=4;
function buildAttGrid(){
  const grid=document.getElementById('attGrid');grid.innerHTML='';
  const days=31;let present=0,absent=0;
  for(let i=1;i<=days;i++){
    const d=document.createElement('div');d.className='att-day';d.textContent=i;
    d.onclick=function(){
      if(this.classList.contains('present')){this.classList.remove('present');this.classList.add('absent');}
      else if(this.classList.contains('absent')){this.classList.remove('absent');}
      else{this.classList.add('present');}
      updateCounts();
    };
    grid.appendChild(d);
  }
}
function updateCounts(){
  document.getElementById('presentCount').textContent=document.querySelectorAll('#attGrid .att-day.present').length;
  document.getElementById('absentCount').textContent=document.querySelectorAll('#attGrid .att-day.absent').length;
}
buildAttGrid();
attMonth.addEventListener('change',buildAttGrid);

// ===== ATTENDANCE =====
let attLog = [];
function markAttendance() {
  const event = document.getElementById('attEvent').value;
  const date = document.getElementById('attDate').value;
  const name = document.getElementById('attName').value;
  const role = document.getElementById('attRole').value;
  const status = document.querySelector('input[name="attStatus"]:checked').value;
  if(!event || !date || !name) { alert('Please fill in all required fields.'); return; }
  attLog.push({event,date,name,role,status,time:new Date().toLocaleTimeString()});
  const logDiv = document.getElementById('attLog');
  logDiv.innerHTML = `<h4 style="color:var(--green-dark);margin-bottom:12px;font-family:'Playfair Display',serif;">Today's Log</h4>` +
    attLog.map(a=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--cream);border-radius:8px;margin-bottom:8px;font-size:.85rem;">
      <span><strong>${a.name}</strong> (${a.role})</span>
      <span class="status-badge ${a.status==='Present'?'status-done':a.status==='Late'?'status-ongoing':''}">
        ${a.status==='Present'?'✅':a.status==='Late'?'⏰':'❌'} ${a.status}
      </span>
    </div>`).join('');
  document.getElementById('attName').value = '';
}