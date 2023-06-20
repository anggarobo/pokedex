import Image from "next/image";
import Layout from "~/components/layout";

function Pokemons() {
    return (
        <Layout>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className='absolute z-10 h-40 cursor-pointer'>
                    <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg' alt='pokemon' width={180} height={160} className="h-full" />
                    {/* <img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /> */}
                </figure>
                <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Pokemons;