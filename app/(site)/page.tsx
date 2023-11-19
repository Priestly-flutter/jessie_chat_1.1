import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <div className="
      flex
      min-h-full
      h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gray-100
    ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Class Universe logo"
        />
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight
          text-gray-900
          "
        >
          Sign into your account
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
