/**
 * Letter Glitch Effect - Embeddable Library
 * Add animated glitch text effects to any website
 */

/* Logic adapted from LetterGlitch (MIT License)
   Original by Gothsec: github.com/Gothsec/Astro-portfolio
*/

class LetterGlitch {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`LetterGlitch: Container with id "${containerId}" not found`);
            return;
        }

        // Predefined color schemes (original 4 from letter-glitch)
        this.colorSchemes = [
            ['#5e4491', '#A476FF', '#241a38'], // Purple theme (original)
            ['#1a5e3e', '#4ade80', '#0f2818'], // Green theme
            ['#7e1e1e', '#ef4444', '#3d1010'], // Red theme
            ['#1e3a5f', '#60a5fa', '#0f172a']  // Blue/Grayish blue theme
        ];

        // Use provided colors or cycle through schemes
        if (options.glitchColors && options.glitchColors.length > 0 && options.glitchColors[0] !== '') {
            this.glitchColors = options.glitchColors;
        } else if (options.useRandomScheme !== false) {
            // Cycle through schemes using session storage to persist across reloads
            const currentIndex = parseInt(sessionStorage.getItem('letterGlitchSchemeIndex') || '0');
            const nextIndex = (currentIndex + 1) % this.colorSchemes.length;
            sessionStorage.setItem('letterGlitchSchemeIndex', nextIndex.toString());
            this.glitchColors = this.colorSchemes[nextIndex];
        } else {
            this.glitchColors = this.colorSchemes[0]; // Default to first scheme
        }

        this.glitchSpeed = options.glitchSpeed || 33;
        this.smooth = options.smooth !== false;
        this.charWidth = 10;
        this.charHeight = 16;
        this.lines = options.lines || 2;
        this.letters = [];
        this.grid = { columns: 0, rows: 0 };
        this.lastGlitchTime = Date.now();

        this.lettersAndSymbols = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/',
            '[', ']', '{', '}', ';', ':', '<', '>', ',',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];

        this.init();
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
            : { r: 16, g: 16, b: 16 };
    }

    isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    getThemeBackgroundColor() {
        return this.isDarkMode() ? '#121212' : '#ffffff';
    }

    getThemeVignetteColor() {
        return this.isDarkMode() ? '#121212' : '#ffffff';
    }

    getRandomChar() {
        return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
    }

    getRandomColor() {
        return this.glitchColors[Math.floor(Math.random() * this.glitchColors.length)];
    }

    calculateGrid(width, height) {
        const columns = Math.ceil(width / this.charWidth);
        const rows = Math.ceil(height / this.charHeight);
        return { columns, rows };
    }

    initializeLetters(columns, rows, paddingTop = 0) {
        this.grid = { columns, rows };
        this.container.innerHTML = '';
        this.letters = [];

        // Create vignette with dynamic gradient based on current theme
        const { r, g, b } = this.hexToRgb(this.getThemeVignetteColor());
        const vignette = document.createElement('div');
        vignette.className = 'vignette-outer';
        vignette.style.background = `linear-gradient(to right,
            rgba(${r},${g},${b},0.8) 0%,
            rgba(${r},${g},${b},0.4) 15%,
            rgba(${r},${g},${b},0.1) 35%,
            rgba(${r},${g},${b},0) 50%,
            rgba(${r},${g},${b},0.1) 65%,
            rgba(${r},${g},${b},0.4) 85%,
            rgba(${r},${g},${b},0.8) 100%)`;
        this.container.appendChild(vignette);

        const totalLetters = columns * rows;
        for (let i = 0; i < totalLetters; i++) {
            const letter = document.createElement('div');
            letter.className = 'letter';
            letter.textContent = this.getRandomChar();
            letter.style.color = this.getRandomColor();

            const x = (i % columns) * this.charWidth;
            const y = Math.floor(i / columns) * this.charHeight + paddingTop;
            letter.style.left = x + 'px';
            letter.style.top = y + 'px';

            this.container.appendChild(letter);
            this.letters.push({
                element: letter,
                char: this.getRandomChar(),
                color: letter.style.color,
                targetColor: this.getRandomColor()
            });
        }
    }

    updateThemeColors() {
        this.container.style.backgroundColor = this.getThemeBackgroundColor();
    }

    updateLetters() {
        if (this.letters.length === 0) return;

        const updateCount = Math.max(1, Math.floor(this.letters.length * 0.05));
        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * this.letters.length);
            const letter = this.letters[index];

            if (!letter) continue;

            letter.char = this.getRandomChar();
            letter.targetColor = this.getRandomColor();
            letter.element.textContent = letter.char;
            letter.element.style.color = letter.targetColor;
        }
    }

    animate() {
        const now = Date.now();
        if (now - this.lastGlitchTime >= this.glitchSpeed) {
            this.updateLetters();
            this.lastGlitchTime = now;
        }

        requestAnimationFrame(() => this.animate());
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        const width = rect.width;

        const computedStyle = window.getComputedStyle(this.container);
        const paddingTop = parseInt(computedStyle.paddingTop) || 0;

        const columns = Math.ceil(width / this.charWidth);
        const rows = this.lines;
        this.initializeLetters(columns, rows, paddingTop);
    }

    init() {
        // Add lines class to container
        this.container.classList.add(`lines-${this.lines}`);

        // Set initial background color based on current theme
        this.updateThemeColors();

        this.resize();
        this.animate();

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.resize(), 100);
        });

        // Watch for dark/light mode changes and re-render with correct colors
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    this.updateThemeColors();
                    this.resize();
                    break;
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    destroy() {
        window.removeEventListener('resize', this.resizeHandler);
        this.letters = [];
        this.container.innerHTML = '';
    }
}

// Auto-initialize function for easy embedding
window.LetterGlitch = LetterGlitch;

// Helper function to create multiple glitch effects
window.createLetterGlitch = function(containerId, options = {}) {
    return new LetterGlitch(containerId, options);
};

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
    const glitchContainers = document.querySelectorAll('[data-letter-glitch]');

    glitchContainers.forEach((container) => {
        const options = {};
        const colors = container.dataset.colors;
        const speed = container.dataset.speed;
        const lines = container.dataset.lines;
        const useRandomScheme = container.dataset.useRandomScheme;

        if (colors && colors.trim() !== '') {
            options.glitchColors = colors.split(',').map(c => c.trim());
        }
        if (speed) {
            options.glitchSpeed = parseInt(speed);
        }
        if (lines) {
            options.lines = parseInt(lines);
        }
        if (useRandomScheme) {
            options.useRandomScheme = useRandomScheme === 'true';
        }

        new LetterGlitch(container.id, options);
    });
});
