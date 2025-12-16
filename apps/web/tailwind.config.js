/** @type {import('tailwindcss').Config} */
const { join } = require('path');

module.exports = {
    content: [
        join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
        join(__dirname, '../../libs/**/*!(*.stories|*.spec).{ts,tsx,html}')
    ],
    theme: {
        extend: {
            colors: {
                'ios-bg': '#F2F2F7',
                'ios-card': '#FFFFFF',
                'ios-blue': '#007AFF',
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
