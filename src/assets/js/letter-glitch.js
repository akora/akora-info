/**
 * Letter Glitch Effect - Embeddable Library
 * Add animated glitch text effects to any website
 */
class LetterGlitch {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`LetterGlitch: Container with id "${containerId}" not found`);
            return;
        }

        this.glitchColors = options.glitchColors || ['#5e4491', '#A476FF', '#241a38'];
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
        this.container.innerHTML = '<div class="vignette-outer"></div>';
        this.letters = [];
        
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
            
            if (this.smooth) {
                letter.element.style.color = letter.targetColor;
            } else {
                letter.element.style.color = letter.targetColor;
            }
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
        const height = rect.height;
        
        // Account for padding when calculating available height
        const computedStyle = window.getComputedStyle(this.container);
        const paddingTop = parseInt(computedStyle.paddingTop) || 0;
        const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
        const availableHeight = height - paddingTop - paddingBottom;
        
        const columns = Math.ceil(width / this.charWidth);
        const rows = this.lines; // Use the lines parameter directly for rows
        this.initializeLetters(columns, rows, paddingTop);
    }

    init() {
        // Add lines class to container
        this.container.classList.add(`lines-${this.lines}`);
        
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.resize(), 100);
        });
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
    glitchContainers.forEach(container => {
        const options = {};
        const colors = container.dataset.colors;
        const speed = container.dataset.speed;
        const lines = container.dataset.lines;
        
        if (colors) {
            options.glitchColors = colors.split(',').map(c => c.trim());
        }
        if (speed) {
            options.glitchSpeed = parseInt(speed);
        }
        if (lines) {
            options.lines = parseInt(lines);
        }
        
        new LetterGlitch(container.id, options);
    });
});
