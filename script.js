(function(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.nav');

  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
  }

  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const buttons=group.querySelectorAll('[data-filter]');
    const target=group.dataset.filterGroup;
    const cards=document.querySelectorAll(
      '[data-filter-target="'+target+'"]'
    );

    buttons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        buttons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');

        const value=btn.dataset.filter;

        cards.forEach(card=>{
          card.hidden=!(
            value==='all' ||
            card.dataset.category===value
          );
        });
      });
    });
  });

  document.querySelectorAll('[data-tabs]').forEach(root=>{
    const buttons=root.querySelectorAll('[data-tab]');
    const panels=root.querySelectorAll('[data-panel]');

    buttons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        buttons.forEach(b=>b.classList.remove('active'));
        panels.forEach(p=>p.classList.remove('active'));

        btn.classList.add('active');

        const panel=root.querySelector(
          '[data-panel="'+btn.dataset.tab+'"]'
        );

        if(panel){
          panel.classList.add('active');
        }
      });
    });
  });


  /* =========================================================
     V2.10
     LAYANAN DIGITAL KESEHATAN + VISITOR COUNTER
     ========================================================= */

  const isHome =
    location.pathname==='/' ||
    /\/index\.html$/i.test(location.pathname);

  if(isHome){

    const style=document.createElement('style');

    style.textContent=`

      .digital-health{
        padding:56px 0;
        background:linear-gradient(180deg,#f3faf7,#fff);
      }

      .digital-health .digital-head{
        text-align:center;
        max-width:780px;
        margin:0 auto 28px;
      }

      .digital-health .digital-head h2{
        margin:7px 0;
        color:#00563f;
        font-size:clamp(1.7rem,3vw,2.35rem);
        line-height:1.15;
      }

      .digital-health .digital-head p{
        margin:0;
        color:#60716c;
      }

      .digital-grid{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:16px;
      }

      .digital-card{
        position:relative;
        display:flex;
        flex-direction:column;
        min-height:220px;
        padding:22px;
        border:1px solid #dbe8e3;
        border-radius:20px;
        background:#fff;
        text-decoration:none;
        box-shadow:0 10px 28px rgba(0,59,45,.07);
        transition:.2s ease;
        overflow:hidden;
      }

      .digital-card:hover{
        transform:translateY(-4px);
        box-shadow:0 18px 42px rgba(0,59,45,.13);
      }

      .digital-card .digital-icon{
        font-size:2rem;
        margin-bottom:12px;
      }

      .digital-card h3{
        margin:0 0 7px;
        color:#00563f;
        font-size:1.08rem;
      }

      .digital-card p{
        margin:0;
        color:#60716c;
        font-size:.86rem;
        line-height:1.55;
      }

      .digital-card .digital-go{
        margin-top:auto;
        padding-top:15px;
        color:#00845f;
        font-weight:900;
        font-size:.82rem;
      }

      .digital-card.featured{
        background:linear-gradient(135deg,#00563f,#07835f);
        border-color:#00563f;
        color:#fff;
      }

      .digital-card.featured h3,
      .digital-card.featured p,
      .digital-card.featured .digital-go{
        color:#fff;
      }

      .digital-card.featured:after{
        content:'MUDAH • CEPAT • GRATIS';
        position:absolute;
        right:-38px;
        top:18px;
        transform:rotate(35deg);
        background:#fff;
        color:#00563f;
        padding:4px 40px;
        font-size:.58rem;
        font-weight:900;
        letter-spacing:.06em;
      }

      .visitor-box{
        margin:22px auto 0;
        max-width:560px;
        padding:14px 18px;
        border:1px solid #dbe8e3;
        border-radius:16px;
        background:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:12px;
        box-shadow:0 8px 22px rgba(0,59,45,.05);
      }

      .visitor-box img{
        width:auto;
        height:28px;
        max-width:100%;
      }

      .visitor-note{
        font-size:.78rem;
        color:#60716c;
      }

      @media(max-width:900px){

        .digital-grid{
          grid-template-columns:repeat(2,1fr);
        }

      }

      @media(max-width:600px){

        .digital-health{
          padding:44px 0;
        }

        .digital-grid{
          grid-template-columns:1fr;
        }

        .digital-card{
          min-height:180px;
        }

        .visitor-box{
          flex-direction:column;
          text-align:center;
        }

      }

    `;

    document.head.appendChild(style);


    const quick=document.querySelector('.quick');


    if(
      quick &&
      !document.querySelector('.digital-health')
    ){

      const section=document.createElement('section');

      section.className='digital-health';


      section.innerHTML=`

        <div class="container">

          <div class="digital-head">

            <span class="kicker">
              Layanan Digital Kesehatan
            </span>

            <h2>
              Urus kebutuhan kesehatan lebih mudah dari rumah
            </h2>

            <p>
              Akses layanan penting Puskesmas dan kanal resmi
              pemerintah hanya dengan satu klik.
            </p>

          </div>


          <div class="digital-grid">


            <!-- CKG -->

            <a
              class="digital-card featured"
              href="https://share.google/Y8X0hXREnwnkpMogr"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span class="digital-icon">
                🩺
              </span>

              <h3>
                Cek Kesehatan Gratis (CKG)
              </h3>

              <p>
                Temukan informasi dan akses program
                Cek Kesehatan Gratis.
              </p>

              <span class="digital-go">
                Buka layanan CKG →
              </span>

            </a>


            <!-- SKRINING BPJS -->

            <a
              class="digital-card"
              href="https://share.google/DzOVVLEAbfebLGDro"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span class="digital-icon">
                🛡️
              </span>

              <h3>
                Skrining BPJS Kesehatan
              </h3>

              <p>
                Lakukan skrining kesehatan BPJS
                Kesehatan secara online.
              </p>

              <span class="digital-go">
                Mulai skrining →
              </span>

            </a>


            <!-- WHATSAPP -->

            <a
              class="digital-card"
              href="https://wa.me/6282180622274?text=Halo%20Puskesmas%20Tanjung%20Pinang%2C%20saya%20ingin%20mendapatkan%20informasi%20pelayanan."
              target="_blank"
              rel="noopener noreferrer"
            >

              <span class="digital-icon">
                💬
              </span>

              <h3>
                Chat WhatsApp
              </h3>

              <p>
                Berinteraksi langsung untuk menanyakan
                informasi pelayanan.
              </p>

              <span class="digital-go">
                Chat sekarang →
              </span>

            </a>


            <!-- GOOGLE MAPS -->

            <a
              class="digital-card"
              href="https://www.google.com/maps/dir/?api=1&destination=UPTD%20Puskesmas%20Tanjung%20Pinang%20Kota%20Jambi"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span class="digital-icon">
                📍
              </span>

              <h3>
                Google Maps
              </h3>

              <p>
                Dapatkan petunjuk arah menuju
                UPTD Puskesmas Tanjung Pinang.
              </p>

              <span class="digital-go">
                Buka petunjuk arah →
              </span>

            </a>


          </div>


          <!-- VISITOR COUNTER -->

          <div
            class="visitor-box"
            aria-label="Jumlah kunjungan website"
          >

            <span>
              👁️
            </span>

            <img
              src="https://hits.sh/pkmtanjungpinangjambi.vercel.app.svg?label=kunjungan%20website&view=total"
              alt="Jumlah kunjungan website"
              loading="lazy"
            >

            <span class="visitor-note">
              Penghitung kunjungan publik
            </span>

          </div>


        </div>

      `;


      quick.insertAdjacentElement(
        'afterend',
        section
      );

    }

  }


  /* =========================================================
     PERLINDUNGAN RINGAN GAMBAR
     ========================================================= */

  document.addEventListener(
    'dragstart',
    e=>{

      if(
        e.target &&
        e.target.tagName==='IMG'
      ){

        e.preventDefault();

      }

    }
  );


  document.addEventListener(
    'contextmenu',
    e=>{

      if(
        e.target &&
        e.target.tagName==='IMG'
      ){

        e.preventDefault();

      }

    }
  );


})();
