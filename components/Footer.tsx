import { motion } from "framer-motion";
import { Github, Instagram, Youtube } from "lucide-react";

export function Footer({ children }: { children?: React.ReactNode }) {
    return (
        <footer className="w-full py-6 bg-black/80 backdrop-blur-md border-t border-white/5 z-50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                <div className="flex flex-col gap-1 items-center md:items-start">
                    <p className="text-white hover:text-neon-cyan transition-colors cursor-default font-bold">Mr. Yeung: M10E-2</p>
                    <p className="opacity-50">Created by <a href="https://www.instagram.com/real.higanste/" target="_blank" className="text-neon-cyan font-bold hover:underline">Arslan</a></p>
                </div>

                <div className="flex items-center gap-4">
                    {children}
                </div>

                <div className="flex items-center gap-6">
                    <FooterIcon href="https://chatgpt.com/" label="ChatGPT" color="hover:text-green-400">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729ZM4.9807 4.1818a4.685 4.685 0 0 1 2.383-2.071 4.733 4.733 0 0 1 3.518-.088c.189.062.373.134.549.215L7.96 5.253a4.708 4.708 0 0 0-2.979-1.071ZM13.2599 24a4.685 4.685 0 0 1-2.383-2.071 4.733 4.733 0 0 1-3.518-.088c-.189.062-.373.134-.549.215l1.471 2.016a4.708 4.708 0 0 0 2.979 1.071ZM13.88 2.049a4.733 4.733 0 0 1 3.491 1.954 4.694 4.694 0 0 1 .442 4.075L15.343 5.37a4.717 4.717 0 0 0-1.463-3.321ZM4.444 19.951a4.733 4.733 0 0 1-3.491-1.954 4.694 4.694 0 0 1-.442-4.075L2.981 16.63a4.717 4.717 0 0 0 1.463 3.321ZM20.677 15.08c.528-1.558.48-3.376-.145-4.885l-2.016 1.471a4.717 4.717 0 0 0 1.071 2.979 4.685 4.685 0 0 1 1.09-1.036ZM2.637 6.92c-.528 1.558-.48 3.376.145 4.885L4.798 10.334a4.717 4.717 0 0 0-1.071-2.979 4.685 4.685 0 0 1-1.09 1.036ZM22.2819 9.8211c.42.593.742 1.258.948 1.968-.528 1.558-.48 3.376-.145 4.885l-2.016-1.471a4.717 4.717 0 0 0 1.071-2.979 4.685 4.685 0 0 1 .142-2.403ZM1.718 14.179c-.42-.593-.742-1.258-.948-1.968.528-1.558.48-3.376.145-4.885l2.016 1.471a4.717 4.717 0 0 0-1.071 2.979 4.685 4.685 0 0 1-.142 2.403Z" /></svg>
                    </FooterIcon>
                    <FooterIcon href="https://www.instagram.com/real.higanste/" label="Instagram" color="hover:text-neon-pink">
                        <Instagram size={20} />
                    </FooterIcon>
                    <FooterIcon href="https://github.com/higanste" label="GitHub" color="hover:text-purple-500">
                        <Github size={20} />
                    </FooterIcon>
                    <FooterIcon href="https://twitter.com/higanste" label="X" color="hover:text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </FooterIcon>
                    <FooterIcon href="https://www.youtube.com/@higanste/shorts" label="YouTube" color="hover:text-red-500">
                        <Youtube size={20} />
                    </FooterIcon>
                    <FooterIcon href="https://vercel.com" label="Vercel" color="hover:text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
                    </FooterIcon>
                </div>
            </div>
        </footer>
    );
}

function FooterIcon({ href, label, children, color }: { href: string, label: string, children: React.ReactNode, color: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-colors ${color} p-2 rounded-full hover:bg-white/10`}
            title={label}
        >
            {children}
        </motion.a>
    )
}
