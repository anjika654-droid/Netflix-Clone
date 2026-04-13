# Netflix-Clone
A fully responsive Netflix-inspired web application built to replicate the core UI and functionality of the popular streaming platform Netflix. This project demonstrates modern front-end development skills, including dynamic content rendering, user interface design, and API integration.  

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Netflix </title>
  <style>
    /* Reset */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html,body { height: 100%; font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; background: #141414; color: #fff; }

    /* Header */
    header{ display:flex; align-items:center; justify-content:space-between; padding:18px 32px; position:fixed; inset:0 0 auto 0; z-index:20; background:linear-gradient(180deg, rgba(20,20,20,0.75), rgba(20,20,20,0.1)); }
    .logo{ font-weight:800; letter-spacing:2px; font-size:22px; color:#E50914; }
    .nav-right{ display:flex; gap:12px; align-items:center; }
    .search{ background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.06); padding:8px 12px; border-radius:6px; color:#ddd; }
    .profile{ width:36px; height:36px; border-radius:6px; background:linear-gradient(135deg,#666,#333); display:flex; align-items:center; justify-content:center; font-weight:700; }

    /* Hero */
    .hero{ padding-top:92px; padding-left:32px; padding-right:32px; margin-bottom:28px; }
    .hero-card{ display:flex; gap:28px; align-items:flex-end; background:linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.0)); padding:40px; border-radius:12px; min-height:340px; background-image: linear-gradient(180deg, rgba(0,0,0,0.45), transparent), url('https://picsum.photos/1200/400?blur=2'); background-size:cover; background-position:center; }
    .hero-info{ max-width:700px; }
    .title{ font-size:44px; font-weight:800; margin-bottom:10px; }
    .desc{ color:#ddd; opacity:0.9; margin-bottom:18px; line-height:1.4; }
    .cta{ display:flex; gap:12px; }
    .btn{ background:#fff; color:#000; padding:10px 16px; border-radius:6px; font-weight:700; cursor:pointer; border:none; }
    .btn.secondary{ background:rgba(109,109,110,0.7); color:#fff; }

    /* Rows */
    .row{ margin-top:28px; }
    .row h3{ margin:8px 0 12px 0; font-size:20px; }
    .cards{ display:grid; grid-auto-flow:column; grid-auto-columns:calc(180px); gap:12px; overflow:auto; padding-bottom:12px; }
    .card{ min-width:180px; height:270px; border-radius:8px; position:relative; background:#222; overflow:hidden; cursor:pointer; transform:translateZ(0); transition:transform .18s ease, box-shadow .18s ease; }
    .card img{ width:100%; height:100%; object-fit:cover; display:block; }
    .card:hover{ transform:scale(1.09) translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.6); z-index:5; }
    .card .meta{ position:absolute; bottom:8px; left:8px; right:8px; font-size:13px; color:#fff; text-shadow: 0 2px 6px rgba(0,0,0,0.6); }

    /* Layout */
    main{ padding:28px 32px 48px; }

    /* Modal */
    .modal{ position:fixed; inset:0; display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.7); z-index:60; }
    .modal.open{ display:flex; }
    .modal-card{ width:min(980px,92%); background:#0f0f0f; border-radius:10px; overflow:hidden; }
    .modal-card header{ padding:12px; display:flex; justify-content:flex-end; }
    .modal-card .content{ padding:18px; }

    /* Responsive */
    @media (max-width:800px){ .hero-card{ flex-direction:column; align-items:flex-start; padding:18px; min-height:220px; } .title{ font-size:28px; } .cards{ grid-auto-columns:140px; } .card{ height:210px; } }

    /* scrollbar small */
    .cards::-webkit-scrollbar{ height:8px; }
    .cards::-webkit-scrollbar-thumb{ background:rgba(255,255,255,0.08); border-radius:6px; }
  </style>
</head>
<body>
  <header>
    <div class="logo">NETFLIX</div>
    <div class="nav-right">
      <input class="search" placeholder="Search" aria-label="Search" />
      <div class="profile" title="Account">A</div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero-card">
        <div class="hero-info">
          <div class="title">Featured — The Lost Signal</div>
          <div class="desc">An edge-of-your-seat sci-fi thriller about a team chasing a mysterious frequency that changes reality. Stylish visuals and a gripping score.</div>
          <div class="cta">
            <button class="btn" id="playFeatured">Play</button>
            <button class="btn secondary" id="moreInfo">More Info</button>
          </div>
        </div>
      </div>

      <!-- Rows of content -->
      <div class="row">
        <h3>Popular on Netflix</h3>
        <div class="cards" id="popularRow"></div>
      </div>

      <div class="row">
        <h3>Trending Now</h3>
        <div class="cards" id="trendingRow"></div>
      </div>

      <div class="row">
        <h3>New Releases</h3>
        <div class="cards" id="newRow"></div>
      </div>

    </section>
  </main>

  <!-- Modal preview -->
  <div class="modal" id="modal">
    <div class="modal-card" role="dialog" aria-modal="true">
      <header><button id="closeModal" class="btn secondary">Close</button></header>
      <div class="content">
        <h2 id="modalTitle">Title</h2>
        <p id="modalDesc">Description text</p>
        <!-- Optional video placeholder -->
        <div style="margin-top:12px; aspect-ratio:16/9; background:#000; display:flex; align-items:center; justify-content:center; color:#666; border-radius:8px;">Trailer / Video</div>
      </div>
    </div>
  </div>

  <script>
    // Small sample dataset for demo posters
    const sample = Array.from({length: 12}).map((_,i)=>({
      id: i+1,
      title: ['The Lost Signal','Dark Waters','Azure Nights','City of Echoes','Midnight Run','Silent Shore','Neon Dawn','Aftermath','Broken Compass','Glass Tower','Silver Line','Hidden Truths'][i%12],
      desc: 'Short synopsis for the title that describes the plot in one sentence.',
      img: `https://picsum.photos/seed/net${i}/400/600`
    }));

    function makeCard(item){
      const el = document.createElement('div');
      el.className = 'card';
      el.tabIndex = 0;
      el.innerHTML = `<img src="${item.img}" alt="${item.title} poster" loading="lazy" /><div class="meta">${item.title}</div>`;
      el.addEventListener('click', ()=> openModal(item));
      el.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') openModal(item); });
      return el;
    }

    function populate(){
      const popular = document.getElementById('popularRow');
      const trending = document.getElementById('trendingRow');
      const newRow = document.getElementById('newRow');
      sample.slice(0,8).forEach(it=> popular.appendChild(makeCard(it)));
      sample.slice(4,12).forEach(it=> trending.appendChild(makeCard(it)));
      sample.slice(2,8).forEach(it=> newRow.appendChild(makeCard(it)));
    }

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    function openModal(item){
      modalTitle.textContent = item.title;
      modalDesc.textContent = item.desc;
      modal.classList.add('open');
    }
    function closeModal(){ modal.classList.remove('open'); }

    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('playFeatured').addEventListener('click', ()=> alert('Play featured — demo only'));
    document.getElementById('moreInfo').addEventListener('click', ()=> openModal(sample[0]));

    // close modal on background click
    modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

    populate();
  </script>
</body>
</html>
