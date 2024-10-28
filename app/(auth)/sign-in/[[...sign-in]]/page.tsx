import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg?t=st=1729860793~exp=1729864393~hmac=867ba689efcba0d7e11dcafd5aa19b1b720977e4950767c75e498c9f8da93e1e&w=1800"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />
                        <div className="hidden lg:relative lg:block lg:py-7 px-12">
                            <h2 className="mt-16 text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl">
                                Welcome to AI Interview Mocker
                            </h2>
                        </div>
                    </section>
                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">


                                <h1 className="mt-10 mb-7 text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl">
                                    Welcome to AI Interview Mocker
                                </h1>
                            </div>
                            <SignIn />
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}