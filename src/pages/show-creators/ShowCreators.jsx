  import Card from '../../components/card/Card.jsx'
  
  export default function ShowCreators(props) {
    return (
      
      <div>
        <div className="bg-gradient-to-b from-slate-900 to-gray-900">
          <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
            <div id="best" className='flex justify-center items-center'>
              <img src='./icons8-sparkles-48.png/' className='max-w-10 max-h-10'/>               
              <h2 className="text-gray-100 my-9 font-bold text-4xl">Best Creators</h2>
            </div>

            <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {props.creators.map((creator) => (
                  <Card creator={creator}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  