import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons';
import { createRef, useState } from 'react';

export async function getServerSideProps(context) {
    console.log('Fetching random image');
    const r = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await r.json();
    console.log('Image data:', data);
    if (data.status !== 'success') {
        throw new Error(`Failed to get random image: ${JSON.stringify(data)}`);
    }
    return {
        props: {
            imageUrl: data.message,
        },
    };
}

export default function Home(props: { imageUrl: string }) {
    console.log('Page props:', props);
    const [email, setEmail] = useState('');
    const formRef = createRef<HTMLFormElement>();

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        console.log('Subscribing user:', email);
    };

    return (
        <div>
            <header className="flex justify-center py-16">
                <div className="grid grid-cols-5 gap-5 max-w-screen-lg">
                    <div className="col-span-2 mt-12">
                        <h1 className="text-4xl text-slate-800 font-bold">
                            Doggie of The Day
                        </h1>
                        <h2 className="text-xl font-light text-slate-500 mt-2">
                            Curated in person for you with
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="text-red-500 mx-1"
                            />
                        </h2>
                    </div>
                    <div className="col-span-3 px-2">
                        <img
                            className="w-full rounded-lg shadow-lg h-96 object-cover"
                            src={props.imageUrl}
                        />
                        <div>
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className="fa-lg text-cyan-500 cursor-pointer mr-1"
                            />
                            <span className="leading-10">
                                12,321 people liked
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="bg-blue-50 flex justify-center py-16">
                <div>
                    <h1 className="text-3xl text-slate-700 font-semibold">
                        Subscribe to Your Daily Doggie
                    </h1>
                    <form ref={formRef} className="mt-8">
                        <input
                            type="email"
                            className="rounded-md w-72 h-9 px-2 mr-2"
                            placeholder="Your email address"
                            onChange={onEmailChange}
                        />
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white uppercase px-6 py-1 text-lg rounded"
                            onClick={onSubscribe}
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </main>

            <footer></footer>
        </div>
    );
}
