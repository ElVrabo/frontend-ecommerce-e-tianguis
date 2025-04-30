/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        // Colores
        colors: {
          'primary-blue': {
            DEFAULT: '#2713C2',
            dark: '#1e0e9e',
            darker: '#160a7a',
          },
          'background-paper': '#ffffff',
          'modal-border': '#ffffff',
          'sidebar-bg': '#2713C2',
          'submenu-bg': '#2713C2',
          'hover-bg': 'rgba(39, 19, 194, 0.8)',
          'card-border': '#e5e7eb',
          'card-title': '#333333',
          'card-text': '#555555',
          'icon-primary': '#2713C2',
          'icon-secondary': '#6b7280',
          'icon-danger': '#ef4444',
          'icon-success': '#10b981',
          'input-border': '#d1d5db',
          'input-focus': '#2713C2',
          'input-label': '#6b7280',
          'input-filled-bg': '#f3f4f6',
          'menu-bg': '#ffffff',
          'menu-item-hover': '#2713C2',
          'menu-divider': '#f3f4f6',
          'yellow-400': '#f5a623', // Color de estrellas
          'yellow-500': '#ffb836', // Color hover
          'alert-success': {
                bg: '#f0fdf4',
                border: '#86efac',
                text: '#166534',
                hover: '#14532d'
          },
          'alert-error': {
                bg: '#fef2f2',
                border: '#fca5a5',
                text: '#991b1b',
                hover: '#7f1d1d'
          },
          'alert-info': {
                bg: '#eff6ff',
                border: '#93c5fd',
                text: '#1e40af',
                hover: '#1e3a8a'
          },
          'button-contained': {
                DEFAULT: '#2713C2',
                hover: '#1e0e9e',
                focus: '#160a7a'
          },
          'button-outlined': {
                DEFAULT: 'transparent',
                text: '#2713C2',
                border: '#2713C2',
                hover: 'rgba(39, 19, 194, 0.1)'
          },
        },

        // Tamaños y espaciado
        spacing: {
          'modal-width': '700px',
          'modal-height': '85vh',
          'sidebar-width': '250px',
          'card-width': '300px',
          'card-image-height': '200px',
          'card-button-width': '250px',
          'card-button-height': '45px',
          'card-image-size': '300px', // específico para la imagen del carrito
          'button-height': '3rem', // h-12
          'button-padding-x': '1rem', // px-4
          'button-padding-y': '0.5rem', // py-2
          'icon-xs': '1rem',
          'icon-sm': '1.25rem',
          'icon-md': '1.5rem',
          'icon-lg': '1.75rem',
          'icon-xl': '2rem',
          'input-height': '3rem',
          'input-padding-x': '0.75rem',
          'input-padding-y': '0.5rem',
          'menu-width': '14rem', // 56
          'menu-item-padding-x': '0.5rem',
          'menu-item-padding-y': '0.5rem',
          '12': '3rem', // 48px (para márgenes grandes)
        },

        // Efectos para botones
        boxShadow: {
        'button-focus': '0 0 0 2px rgba(39, 19, 194, 0.5)',
        'input-focus': '0 0 0 2px rgba(39, 19, 194, 0.2)',
        'menu': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },

        maxWidth: {
            'xs': '20rem',
            '3xl': '48rem', // 768px (para el contenedor)
        },
        
        // Bordes
        borderRadius: {
          'modal': '0.5rem',
          'sidebar': '0.25rem',
          'card': '0.625rem', // 10px
        },
        
        // Padding
        padding: {
          'modal': '1rem',
          'sidebar': '1.25rem',
        },
        
        // Tipografía
        fontSize: {
          'sidebar-title': '1.5rem',
          'sidebar-item': '1rem',
        },

        // Sombras
        boxShadow: {
          'card': '0 4px 8px rgba(0, 0, 0, 0.2)',
          'card-hover': '0 6px 12px rgba(0, 0, 0, 0.3)',
        },
      
        // Transiciones
        transitionDuration: {
          'card': '300ms',
          'input': '200ms',
        },
        transitionProperty: {
            'button': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            'icon': 'color, transform',
            'input': 'border-color, box-shadow',
            'height': 'height',
            'spacing': 'margin, padding',
        },
        transitionTimingFunction: {
            'menu-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'menu-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        
        aria: {
            'current': 'current',
            'label': 'label',
        },
        // Animaciones
        keyframes: {
          hide: {
            from: { opacity: "1" },
            to: { opacity: "0" },
          },
          slideDownAndFade: {
            from: { opacity: "0", transform: "translateY(-6px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          slideLeftAndFade: {
            from: { opacity: "0", transform: "translateX(6px)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
          slideUpAndFade: {
            from: { opacity: "0", transform: "translateY(6px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          slideRightAndFade: {
            from: { opacity: "0", transform: "translateX(-6px)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
          accordionOpen: {
            from: { height: "0px" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          accordionClose: {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0px" },
          },
          dialogOverlayShow: {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          dialogContentShow: {
            from: { opacity: "0", transform: "translate(-50%, -45%) scale(0.95)" },
            to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          },
          drawerSlideLeftAndFade: {
            from: { opacity: "0", transform: "translateX(100%)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
          drawerSlideRightAndFade: {
            from: { opacity: "1", transform: "translateX(0)" },
            to: { opacity: "0", transform: "translateX(100%)" },
          },
          alertFadeIn: {
            from: { opacity: '0', transform: 'translateY(-10px)' },
            to: { opacity: '1', transform: 'translateY(0)' }
          },
          scale: {
            '0%, 100%': { transform: 'scaleY(0.3)' },
            '50%': { transform: 'scaleY(1)' },
          },
        },
        
        animation: {
          hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideDownAndFade: "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideLeftAndFade: "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideRightAndFade: "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          accordionOpen: "accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)",
          accordionClose: "accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)",
          dialogOverlayShow: "dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          dialogContentShow: "dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          drawerSlideLeftAndFade: "drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          drawerSlideRightAndFade: "drawerSlideRightAndFade 150ms ease-in",
          alertFadeIn: 'alertFadeIn 0.3s ease-out',
          spin: 'spin 1s linear infinite',
          bounce: 'bounce 1.5s infinite',
          scale: 'scale 1.5s ease-in-out infinite',  
        },
        
        // Configuraciones responsive
        screens: {
          'sidebar-collapse': '768px', // Breakpoint específico para el sidebar
        },

      },
    },
    plugins: [
      require("@tailwindcss/forms"),
      require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
  }