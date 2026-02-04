import { motion } from 'framer-motion';
import { classmates } from '@/data/classmates';

export const Footer = () => {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      url: 'https://x.com/higanste',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/real.higanste/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@higanste/shorts',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  const students = classmates.filter(c => !c.isTeacher);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full py-8 px-4 mt-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-8">
            {/* Main footer content */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Created By */}
              <motion.div 
                className="text-center md:text-left"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-muted-foreground mb-1">Created with ❤️ by</p>
                <p className="text-xl font-bold text-foreground">Arslan Sohail</p>
                <p className="text-xs text-muted-foreground mt-1">
                  A Student Tool for Mr. Yeung's Class
                </p>
              </motion.div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              {/* Powered By */}
              <motion.div 
                className="text-center md:text-right"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs text-muted-foreground mb-1">Powered by</p>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  <svg className="w-4 h-4" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  <span>Vercel</span>
                </a>
              </motion.div>
            </div>

            {/* Class info divider */}
            <div className="border-t border-border/50 pt-6">
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-foreground">
                  🏫 Made for Mr. Yeung: M10E-2 • E Slot • DCI-25/26
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Dakota Collegiate • Winnipeg, Manitoba
                </p>
              </div>

              {/* Class roster Easter egg */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {students.map((student, i) => (
                  <motion.span
                    key={student.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: 'hsl(var(--primary) / 0.2)',
                      color: 'hsl(var(--primary))'
                    }}
                    className="text-xs px-2 py-1 bg-secondary/50 rounded-full text-muted-foreground cursor-default transition-all"
                  >
                    {student.firstName}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-muted-foreground">
              <p>© 2024-2026 • Built by a student, for students 📚</p>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
