import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

function GlobalStyles() {
  useEffect(() => {
    const css = `
      /* Theme variables applied on the html element so we can toggle via class */
      html.dark{
        --bg-0:#05060a; --bg-1:#071126; --card-bg:linear-gradient(180deg,#071226,#081226); --card-border:rgba(255,255,255,0.04);
        --muted:#98a5b6; --accent:#6d28d9; --accent-2:#0ea5a1;
        --glass: rgba(255,255,255,0.03); --glass-2: rgba(255,255,255,0.02); --radius:14px; --max-w:1100px;
        --text: #e7eef8;
        color-scheme: dark;
      }
      html.light{
        --bg-0:#ffffff; --bg-1:#f7fafc; --card-bg:linear-gradient(180deg,#ffffff,#f8fafc); --card-border:rgba(2,6,23,0.06);
        --muted:#52606d; --accent:#6d28d9; --accent-2:#0ea5a1;
        --glass: rgba(2,6,23,0.04); --glass-2: rgba(2,6,23,0.02); --radius:14px; --max-w:1100px;
        --text: #213547;
        color-scheme: light;
      }
      *,*::before,*::after{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;background:linear-gradient(180deg,var(--bg-0),var(--bg-1));color:var(--text, #e7eef8);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;padding:22px}

      .app{display:flex;flex-direction:column;align-items:center;min-height:100%}
      .topbar{width:100%;max-width:var(--max-w);display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-radius:12px;background:var(--card-bg);border:1px solid var(--card-border);margin-bottom:18px}
      .brand{display:flex;align-items:center;gap:12px}
      .logo{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#8b5cf6);display:flex;align-items:center;justify-content:center;font-weight:700;color:white}
      .title{font-weight:700;font-size:18px}
      .navlinks{display:flex;gap:10px;align-items:center}
      .navlinks a{color:var(--muted);text-decoration:none;font-size:14px}

      main.container{width:100%;max-width:var(--max-w);display:flex;gap:20px}

      .layout{display:grid;grid-template-columns:1fr 320px;gap:20px;width:100%}
      @media (max-width:980px){.layout{grid-template-columns:1fr}}

      .panel{
        background:var(--card-bg);
        border:1px solid var(--card-border);padding:16px;border-radius:var(--radius)}

      .tabs-nav{display:flex;gap:4px;margin-bottom:14px;border-bottom:1px solid var(--card-border)}
      .tab-btn{padding:8px 16px;border:none;background:transparent;color:var(--muted);font-size:16px;font-weight:600;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;}
      .tab-btn.active{color:var(--text);border-bottom-color:var(--accent)}

      .create h2{margin:0 0 6px 0}
      .row{display:flex;gap:10px}
      @media (max-width:640px){.row{flex-direction:column}}
      .input{width:100%;padding:12px;border-radius:10px;background:var(--glass);border:1px solid var(--card-border);color:inherit}
      .textarea{min-height:110px}
      .actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px}
      .btn{padding:10px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:600}
      .btn.primary{background:linear-gradient(90deg,var(--accent),#8b5cf6);color:var(--text)}
      .btn.ghost{background:transparent;border:1px solid var(--card-border);color:var(--muted)}

      .posts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
      @media (max-width:880px){.posts-grid{grid-template-columns:1fr}}
      .card-post{
        padding:14px;border-radius:12px;
        background:var(--card-bg);
        border:1px solid var(--card-border);transition:transform .18s ease,box-shadow .18s ease}
      .card-post:hover{transform:translateY(-6px);box-shadow:0 10px 30px rgba(2,6,23,0.6)}
      .card-post h3{margin:0 0 6px}
      .meta{font-size:12px;color:var(--muted)}
      .excerpt{margin-top:8px;color:var(--muted)}

      .sidebar .card{display:flex;flex-direction:column;gap:8px}
      .compact{display:flex;align-items:center;gap:10px}
      .avatar{width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
      .search{display:flex;gap:8px}
      .search input{flex:1}

      .post-hero{display:flex;align-items:flex-start;gap:14px}
      .post-hero h1{margin:0}
      .post-body{margin-top:12px;line-height:1.7;color:var(--text)}
      .post-controls{display:flex;gap:8px;margin-top:12px}

      footer{margin-top:20px;color:var(--muted);font-size:13px;text-align:center}

      .muted{color:var(--muted)}
      .center{display:flex;justify-content:center}
      code{background:var(--glass);padding:4px 6px;border-radius:6px}
    `;

    const node = document.createElement('style');
    node.setAttribute('data-app-styles','1');
    node.innerHTML = css;
    document.head.appendChild(node);

    return ()=>{document.head.removeChild(node)};
  }, []);
  return null;
}

function useTheme() {
  const [theme, setTheme] = React.useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (e) {}
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme]);

  // If user hasn't explicitly chosen a theme, respond to system changes
  useEffect(() => {
    let mql;
    try {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => {
        const stored = localStorage.getItem('theme');
        if (stored) return; // user override
        setTheme(e.matches ? 'dark' : 'light');
      };
      mql.addEventListener ? mql.addEventListener('change', handler) : mql.addListener(handler);
      return () => { mql.removeEventListener ? mql.removeEventListener('change', handler) : mql.removeListener(handler) };
    } catch (e) {}
  }, []);

  return [theme, setTheme];
}

function slugify(s){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}

const initialPosts = [
  {id:'hello-world',title:'Hello World',content:'Welcome to your new responsive blog. Edit, add, and explore posts!',date:'2025-11-10'},
  {id:'react-router-dynamic',title:'Dynamic Routing with React Router',content:'This example shows how to use URL parameters to render different content for each blog post.',date:'2025-11-09'},
  {id:'design-tips',title:'Design Tips for Small Blogs',content:'Keep content concise, use readable fonts, add whitespace. This demo highlights responsive layout and accessible UI.',date:'2025-11-08'}
];

function PostCard({post}){
  return (
    <article className='card-post'>
      <Link to={`/posts/${post.id}`} style={{textDecoration:'none',color:'inherit'}}>
        <h3>{post.title}</h3>
        <div className='meta'>{post.date} — /posts/{post.id}</div>
        <p className='excerpt'>{post.content}</p>
      </Link>
    </article>
  )
}

function PostList({posts,addPost}){
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [filter,setFilter]=useState('');
  const [activeTab, setActiveTab] = useState('posts');

  function submit(e){
    e.preventDefault(); 
    if(!title.trim()||!content.trim())return;
    let id=slugify(title);
    let final=id;
    let i=1;
    while(posts.some(p=>p.id===final)){final=`${id}-${i++}`} 
    addPost({id:final,title:title.trim(),content:content.trim(),date:new Date().toISOString().split('T')[0]});
    setTitle('');
    setContent('');
    setActiveTab('posts');
  }

  const shown = posts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase())||p.content.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className='panel'>
      
      <div className='tabs-nav'>
        <button 
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create
        </button>
      </div>

      <div>
        {activeTab === 'create' && (
          <div className='create'>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div>
                <h2 style={{margin:0}}>Create New Post</h2>
                <div className='muted' style={{fontSize:13}}>Publish short posts quickly</div>
              </div>
              <div className='compact muted'>Tips <span style={{marginLeft:8}}>• keep titles short</span></div>
            </div>
            <form onSubmit={submit}>
              <div className='row'>
                <input className='input' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
                <input className='input' placeholder='Optional tags (comma separated)' />
              </div>
              <div style={{marginTop:10}}>
                <textarea className='input textarea' placeholder='Write your post...' value={content} onChange={e=>setContent(e.target.value)} />
              </div>
              <div className='actions'>
                <button type='button' className='btn ghost' onClick={()=>{setTitle('');setContent('')}}>Clear</button>
                <button className='btn primary'>Publish</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <h2 style={{margin:0}}>All Posts</h2>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input className='input' placeholder='Search posts...' value={filter} onChange={e=>setFilter(e.target.value)} style={{width:220}} />
                <span className='muted' style={{fontSize:12}}>{shown.length} results</span>
              </div>
            </div>
            <div className='posts-grid' style={{marginTop: 14}}>
              {shown.map(p=> <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


function PostPage({getPostById,deletePost,updatePost}){
  const {id}=useParams();
  const post=getPostById(id);
  const nav=useNavigate();
  const [editing,setEditing]=useState(false);
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');

  useEffect(()=>{ if(post){setTitle(post.title);setContent(post.content)} },[post]);

  if(!post) return (<div className='panel'><h2>Not found</h2><p className='muted'>No post matches <code>{id}</code></p><Link to='/' className='btn ghost'>Back</Link></div>);

  function save(e){e.preventDefault(); updatePost(id,{title:title.trim(),content:content.trim()}); setEditing(false)}
  function remove(){ if(confirm('Delete this post?')){ deletePost(id); nav('/')} }

  return (
    <div className='panel'>
      {!editing? (
        <>
          <div className='post-hero'>
            <div style={{flex:1}}>
              <h1>{post.title}</h1>
              <div className='muted' style={{marginTop:6}}>{post.date} • /posts/{post.id}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className='btn ghost' onClick={()=>setEditing(true)}>Edit</button>
              <button className='btn' onClick={remove} style={{background:'linear-gradient(90deg,#ef4444,#dc2626)',color:'#fff'}}>Delete</button>
            </div>
          </div>
          <div className='post-body'>{post.content}</div>
        </>
      ): (
        <form onSubmit={save}>
          <input className='input' value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className='input textarea' value={content} onChange={e=>setContent(e.target.value)} style={{marginTop:10}} />
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button className='btn primary'>Save</button>
            <button type='button' className='btn ghost' onClick={()=>setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}

function AboutPage() {
  return (
    <div className='panel'>
      <h2>About This Blog</h2>
      <p className='post-body'>
        Welcome to SimpleBlog! This is a demo application built with React
        to showcase a responsive, single-file blog system.
      </p>
      <p className='post-body'>
        All posts are stored in your browser's <code>localStorage</code>,
        so they'll persist as long as you don't clear your browser data.
      </p>
      
      <h3 style={{marginTop: 20}}>About the Author</h3>
      <div className='compact'>
        <div className='avatar'>VP</div>
        <div>
          <div style={{fontWeight: 700}}>Ved Patel</div>
          <div className='muted' style={{fontSize: 13}}>Blog Creator</div>
        </div>
      </div>
      <p className='post-body' style={{marginTop: 8}}>
        Ved is a passionate developer who enjoys building clean and
        functional web applications.
      </p>
    </div>
  );
}


export default function App(){
  const [posts,setPosts]=useState(initialPosts);
  const [theme, setTheme] = useTheme();
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  useEffect(()=>{
    try{ const raw=localStorage.getItem('posts_v1'); if(raw){ setPosts(JSON.parse(raw)) } }
    catch(e){}
  },[])

  useEffect(()=>{ try{ localStorage.setItem('posts_v1', JSON.stringify(posts)) }catch(e){} },[posts])

  function addPost(p){ setPosts(s=>[p,...s]) }
  function getPostById(id){ return posts.find(x=>x.id===id) }
  function deletePost(id){ setPosts(s=>s.filter(x=>x.id!==id)) }
  function updatePost(id,changes){ setPosts(s=> s.map(p=> p.id===id? {...p,...changes}:p)) }

  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className='app'>
        <header className='topbar'>
          <div className='brand'>
            <div className='logo'>Blog</div>
            <div>
              <div className='title'>BlogPage</div>
              <div className='muted' style={{fontSize:12}}>Reactive posts • responsive layout</div>
            </div>
          </div>
          <nav className='navlinks'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <button onClick={toggleTheme} className='btn ghost' aria-label='Toggle theme' style={{marginLeft:8}}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          </nav>
        </header>

        <main className='container'>
          <div className='layout'>
            <section>
              <Routes>
                <Route path='/' element={<PostList posts={posts} addPost={addPost} />} />
                <Route path='/posts/:id' element={<PostPage getPostById={getPostById} deletePost={deletePost} updatePost={updatePost} />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='*' element={<div className='panel'><h2>404</h2><p className='muted'>Try the home page.</p><Link to='/' className='btn ghost'>Home</Link></div>} />
              </Routes>
            </section>

            <aside className='sidebar'>
              <div className='panel'>
                <div className='compact'>
                  <div className='avatar'>Blog</div>
                  <div>
                    <div style={{fontWeight:700}}>BlogPage</div>
                    <div className='muted' style={{fontSize:13}}>Demo app</div>
                  </div>
                </div>
                <div style={{marginTop:8}} className='muted'>This demo stores posts in localStorage and supports responsive layouts. Use it as a starting point.</div>
              </div>

              <div className='panel'>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h4 style={{margin:0}}>Search</h4>
                  <div className='muted' style={{fontSize:12}}>quick</div>
                </div>
                <div style={{marginTop:8}} className='search'>
                  <input className='input' placeholder='Search by title or content...' onChange={()=>{}} />
                </div>
              </div>

              <div className='panel'>
                <h4 style={{margin:0}}>About</h4>
                <p className='muted' style={{marginTop:8}}>A compact, responsive blog demo. No backend — posts persist in your browser.</p>
              </div>
            </aside>
          </div>

          <footer>Built with react</footer>
        </main>
      </div>
    </BrowserRouter>
  )
}