 
 
import { getProviders, signIn  as SignIntoProvider} from "next-auth/react"
import Header from "../../components/organisms/Header";

function signIn({ providers }) {
    return (
      <>
      <Header/> 
      <div  className="  flex flex-col  items-center  justify-center  min-h-screen py-2 -mt-56 px-14 text-center " >
        <img className="w-80" src="https://links.papareact.com/ocw" alt="instagram" />
        <p>This is not a REAL app, it is build  educational porpuses only</p>
        <div  className="mt-48" >
          {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button onClick={() => SignIntoProvider(provider.id, { callbackUrl:'/' })}  className=" bg-blue-500 rounded-lg text-white p-3 ">
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
      </>
    )
  }
  

 

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
      props: { providers }
    }
  }
  

 
export default signIn;
