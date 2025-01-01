const Footer = () => {
    return (
        <footer className="w-screen flex flex-col items-center bg-[var(--nav-bg)] border-t border-black/10">
            <div className="w-[70%]">
                <div className="mt-8 flex flex-col md:flex-row justify-between">
                    <div>
                        <img className="h-10" src="/logo.png" alt="INRisk Logo" />
                        <p className="mt-0.5 max-w-[320px]">
                            INRisk let you analyse your Risk and give better understanding of your Future.
                        </p>
                    </div>
                    
                    <div className="flex justify-end items-end gap-4">
                        <a href="" className="text-[var(--text-color)]">+91 6389943455</a>
                        <span>inrisk.official@gmail.com</span>
                        <div className="flex justify-center gap-3 my-0.5">
                            <img 
                                className="h-5 invert opacity-75 hover:opacity-100 transition-opacity duration-200" 
                                src="/social/x.png" 
                                alt="X Logo" 
                            />
                            <img 
                                className="h-5 invert opacity-75 hover:opacity-100 transition-opacity duration-200" 
                                src="/social/instagram.png" 
                                alt="Instagram Logo" 
                            />
                            <img 
                                className="h-5 invert opacity-75 hover:opacity-100 transition-opacity duration-200" 
                                src="/social/youtube.png" 
                                alt="YouTube Logo" 
                            />
                            <img 
                                className="h-5 invert opacity-75 hover:opacity-100 transition-opacity duration-200" 
                                src="/social/facebook.png" 
                                alt="Facebook Logo" 
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 border-t border-white/50 flex flex-row items-center justify-between">
                    <nav className="mt-3 flex items-center gap-6 flex-nowrap py-2">
                        <a 
                            href="#" 
                            className="text-[var(--text-color)] no-underline hover:underline text-center"
                        >
                            Terms Of Use
                        </a>
                        <a 
                            href="#" 
                            className="text-[var(--text-color)] no-underline hover:underline text-center"
                        >
                            Services
                        </a>
                        <a 
                            href="#" 
                            className="text-[var(--text-color)] no-underline hover:underline text-center"
                        >
                            Pricing
                        </a>
                        <a 
                            href="#" 
                            className="text-[var(--text-color)] no-underline hover:underline text-center"
                        >
                            Contact
                        </a>
                    </nav>
                    <div className="mt-3 text-center opacity-80 leading-normal text-sm md:text-xs">
                        <p>&copy; 2024 INRisk. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;