import Button from 'react-bootstrap/Button';

function Welcome() {
  return (
    <div className="text-center mt-3 ms-2 me-2" style={{ marginLeft: "15vw", marginRight: "15vw"}}>
      <h1 className="display-1">SCPATG</h1>
      <h3>SCPA Technology Guide</h3>
      <p>Note: This is a beta build. You may experience problems. Please report all bugs to <a href="https://docs.google.com/forms/d/e/1FAIpQLScWCoadd34AGlAAZltIs4UpWhesZ0Hhc1GYfX493IHRqOrDYw/viewform?usp=sf_link">this form</a> so I can fix it ASAP.</p>
      <p className='text-muted'>SCPATG <i>Beta</i> 1.1.0</p>
      <Button variant="primary" className='mt-3' onClick={() => { window.location.href = "/article/"}}>Acknowledge</Button>
    </div>
  )
  
}

export default Welcome;