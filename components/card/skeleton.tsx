function CardLoader() {
    return (
        <div className='h-[320px] flex flex-col items-center relative'>
            <div className="animate-pulse flex space-x-4 h-full w-72">
                <div className="rounded-lg bg-gray-300 w-full h-full"></div>
            </div>
        </div>
    );
}

export default CardLoader;