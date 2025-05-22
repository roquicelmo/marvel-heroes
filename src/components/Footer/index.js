import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="flex flex-col py-4 items-center justify-center gap-2 bg-white">
            <span>Desenvolvido por <Link target="_blank" href="https://www.linkedin.com/in/roquicelmo-reis/" className="font-bold transition-colors hover:text-red-500">Roquicelmo Reis</Link> ⚙️</span>
            <span>Dados fornecidos por <Link target="_blank" href="https://www.marvel.com/" className='hover:text-red-500'>Marvel</Link></span>
        </footer>
    )
}