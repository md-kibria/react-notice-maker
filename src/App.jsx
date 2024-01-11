
import Photo from './assets/notice.png'
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const main = useRef()
  const btn = useRef()
  const date = useRef()
  const d = new Date();

  const [notice, setNotice] = useState('')
  const [author, setAuthor] = useState('')
  const [applicant, setApplicant] = useState('অনুরোধক্রমে')

  useEffect(() => {
    date.current.innerHTML = `Created On: ${d}`;

    if(localStorage.getItem('nm_author')) {
      setAuthor(localStorage.getItem('nm_author'));
    }
    
    if(localStorage.getItem('applicant')) {
      setAuthor(localStorage.getItem('applicant'));
    }
  }, [])

  useEffect(() => {
    html2canvas(main.current, {scale:2}).then(function(canvas) {
      const imageData = canvas.toDataURL("image/jpg");
      const newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");

      
      btn.current.setAttribute("download", "notice.jpg");
      btn.current.setAttribute("href", newData);
    })
  }, [notice, author])

  const handleApplicant = (e) => {
    setApplicant(e.target.value)
    localStorage.setItem('applicant', e.target.value);
  }

  const handleAuthor = (e) => {
    setAuthor(e.target.value)
    localStorage.setItem('nm_author', e.target.value);
  }

  return (
    <div className="body">
      <h1>Notice Maker <span>(Mgt&Mkt Group)</span></h1>
      <div className="controls">
        <textarea onChange={(e) => setNotice(e.target.value)} value={notice} placeholder='তোমার নোটিশ লেখ' />
        <input type="text" onChange={handleApplicant} value={applicant} placeholder='নিবেদক, অনুরোধক্রমে' />
        <input type="text" onChange={handleAuthor} value={author} placeholder='তোমার নাম লেখ' />
      </div>
      
      <span className='preview'>Preview:</span>
      <div ref={main} className="main">
        <img src={Photo} alt="" />
        <p className="date">{new Date().toLocaleDateString('bn')}</p>
        <p className="notice">{notice}</p>
        <p className="applicant">{applicant}</p>
        <p className="author">{author}</p>
        <p ref={date} className="create"></p>
      </div>
      
      <a className="btn" ref={btn}>Download</a>
      <p className="footer">&copy;All rights reserved by <a target='_blank' href="https://www.facebook.com/kibria.prodev">Md Kibria</a></p>
    </div>
  )
}

export default App