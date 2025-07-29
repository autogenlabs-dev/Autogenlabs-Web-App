// Dynamic Preview Generator for Component Gallery
// This creates beautiful uiverse.io style previews on-the-fly

export const generateDynamicPreview = (component) => {
    return new Promise((resolve) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;
            
            // Create beautiful gradient based on component category
            const categoryGradients = {
                'Navigation': ['#667eea', '#764ba2'],
                'Layout': ['#f093fb', '#f5576c'],
                'Forms': ['#4facfe', '#00f2fe'],
                'Data Display': ['#43e97b', '#38f9d7'],
                'User Interface': ['#fa709a', '#fee140'],
                'Content': ['#a8edea', '#fed6e3'],
                'Media': ['#ff9a9e', '#fecfef'],
                'Interactive': ['#ffecd2', '#fcb69f'],
                'Widgets': ['#ff8a80', '#ff80ab'],
                'Sections': ['#84fab0', '#8fd3f4']
            };
            
            const colors = categoryGradients[component.category] || ['#667eea', '#764ba2'];
            
            // Main gradient background
            const gradient = ctx.createLinearGradient(0, 0, 400, 300);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 300);
            
            // Add geometric patterns for visual interest
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            
            // Floating circles
            ctx.beginPath();
            ctx.arc(80, 80, 40, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(320, 60, 25, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(350, 220, 35, 0, Math.PI * 2);
            ctx.fill();
            
            // Main content area with glassmorphism
            const contentGradient = ctx.createLinearGradient(0, 70, 0, 230);
            contentGradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
            contentGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
            ctx.fillStyle = contentGradient;
            ctx.fillRect(50, 70, 300, 160);
            
            // Glass border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(50, 70, 300, 160);
            
            // Component type indicator
            let componentIcon = '⚡';
            if (component.category === 'Forms') componentIcon = '📝';
            else if (component.category === 'Navigation') componentIcon = '🧭';
            else if (component.category === 'Layout') componentIcon = '📐';
            else if (component.category === 'Data Display') componentIcon = '📊';
            else if (component.category === 'Media') componentIcon = '🖼️';
            else if (component.category === 'Interactive') componentIcon = '🎮';
            
            // Icon
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '32px system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(componentIcon, 200, 115);
            
            // Component title
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px "Inter", system-ui';
            ctx.textAlign = 'center';
            const title = component.title || 'Component';
            ctx.fillText(title.length > 15 ? title.substring(0, 15) + '...' : title, 200, 150);
            
            // Category subtitle
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '14px "Inter", system-ui';
            ctx.fillText(component.category, 200, 175);
            
            // Technology badge
            const techColors = {
                'React': '#61dafb',
                'Vue': '#4fc08d',
                'Angular': '#dd1b16',
                'HTML/CSS': '#e34c26',
                'JavaScript': '#f7df1e'
            };
            
            const techColor = techColors[component.language] || '#6366f1';
            ctx.fillStyle = techColor;
            ctx.fillRect(15, 15, 100, 25);
            
            // Tech border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(15, 15, 100, 25);
            
            // Tech text
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 11px "Inter", system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(component.language || 'CSS', 65, 30);
            
            // Plan type badge
            if (component.planType === 'Free') {
                ctx.fillStyle = '#10b981';
                ctx.fillRect(285, 15, 60, 25);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px "Inter", system-ui';
                ctx.fillText('FREE', 315, 30);
            } else if (component.planType === 'Paid') {
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(275, 15, 70, 25);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px "Inter", system-ui';
                ctx.fillText('PREMIUM', 310, 30);
            }
            
            // Difficulty indicator
            const difficultyColors = {
                'Easy': '#10b981',
                'Medium': '#f59e0b', 
                'Hard': '#ef4444',
                'Beginner': '#10b981',
                'Intermediate': '#f59e0b',
                'Advanced': '#ef4444'
            };
            
            const diffColor = difficultyColors[component.difficultyLevel] || '#6b7280';
            ctx.fillStyle = diffColor;
            ctx.beginPath();
            ctx.arc(370, 250, 12, 0, Math.PI * 2);
            ctx.fill();
            
            // Add some sparkle effects
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            const sparkles = [
                {x: 100, y: 50}, {x: 300, y: 40}, {x: 60, y: 200}, 
                {x: 340, y: 180}, {x: 150, y: 250}, {x: 250, y: 30}
            ];
            
            sparkles.forEach(sparkle => {
                ctx.beginPath();
                ctx.arc(sparkle.x, sparkle.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Convert to data URL
            const dataURL = canvas.toDataURL('image/png', 0.9);
            resolve(dataURL);
            
        } catch (error) {
            console.error('Error generating dynamic preview:', error);
            resolve(null);
        }
    });
};

// Function to generate preview for specific component types
export const generateComponentTypePreview = (component) => {
    return new Promise((resolve) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;
            
            // Dark theme background like uiverse.io
            const gradient = ctx.createLinearGradient(0, 0, 400, 300);
            gradient.addColorStop(0, '#0f0f23');
            gradient.addColorStop(0.5, '#1a1a3a');
            gradient.addColorStop(1, '#2d2d5a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 300);
            
            // Add noise texture
            for (let i = 0; i < 150; i++) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
                ctx.fillRect(Math.random() * 400, Math.random() * 300, 1, 1);
            }
            
            // Component-specific rendering
            if (component.category === 'Forms' || component.title.toLowerCase().includes('form')) {
                // Form preview
                const formGradient = ctx.createLinearGradient(0, 60, 0, 240);
                formGradient.addColorStop(0, 'rgba(79, 172, 254, 0.2)');
                formGradient.addColorStop(1, 'rgba(0, 242, 254, 0.1)');
                ctx.fillStyle = formGradient;
                ctx.fillRect(70, 60, 260, 180);
                
                ctx.strokeStyle = 'rgba(79, 172, 254, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(70, 60, 260, 180);
                
                // Form fields
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(90, 90, 220, 30);
                ctx.fillRect(90, 130, 220, 30);
                ctx.fillRect(90, 170, 220, 40);
                
                // Submit button
                const btnGradient = ctx.createLinearGradient(0, 220, 0, 240);
                btnGradient.addColorStop(0, '#4facfe');
                btnGradient.addColorStop(1, '#00f2fe');
                ctx.fillStyle = btnGradient;
                ctx.fillRect(200, 220, 100, 20);
                
            } else if (component.category === 'Navigation' || component.title.toLowerCase().includes('nav')) {
                // Navigation bar preview
                const navGradient = ctx.createLinearGradient(0, 60, 0, 100);
                navGradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
                navGradient.addColorStop(1, 'rgba(118, 75, 162, 0.2)');
                ctx.fillStyle = navGradient;
                ctx.fillRect(50, 60, 300, 40);
                
                // Nav items
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = '12px "Inter", system-ui';
                ctx.textAlign = 'center';
                ['Home', 'About', 'Services', 'Contact'].forEach((item, i) => {
                    ctx.fillText(item, 120 + (i * 60), 85);
                });
                
            } else if (component.category === 'User Interface' || component.title.toLowerCase().includes('card')) {
                // Card preview
                const cardGradient = ctx.createLinearGradient(0, 80, 0, 220);
                cardGradient.addColorStop(0, 'rgba(250, 112, 154, 0.2)');
                cardGradient.addColorStop(1, 'rgba(254, 225, 64, 0.1)');
                ctx.fillStyle = cardGradient;
                ctx.fillRect(80, 80, 240, 140);
                
                ctx.strokeStyle = 'rgba(250, 112, 154, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(80, 80, 240, 140);
                
                // Card content
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 16px "Inter", system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('Card Component', 200, 130);
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.font = '12px "Inter", system-ui';
                ctx.fillText('Beautiful design with animations', 200, 150);
                
            } else {
                // Generic modern component
                const compGradient = ctx.createLinearGradient(0, 80, 0, 220);
                compGradient.addColorStop(0, 'rgba(132, 250, 176, 0.2)');
                compGradient.addColorStop(1, 'rgba(56, 249, 215, 0.1)');
                ctx.fillStyle = compGradient;
                ctx.fillRect(80, 80, 240, 140);
                
                ctx.strokeStyle = 'rgba(132, 250, 176, 0.4)';
                ctx.lineWidth = 2;
                ctx.strokeRect(80, 80, 240, 140);
                
                // Component icon
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.font = '36px system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('⚡', 200, 135);
                
                // Component name
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 16px "Inter", system-ui';
                ctx.fillText(component.title || 'Component', 200, 170);
            }
            
            // Technology badge
            const techGradient = ctx.createLinearGradient(0, 15, 0, 35);
            techGradient.addColorStop(0, '#667eea');
            techGradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = techGradient;
            ctx.fillRect(15, 15, 100, 25);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(15, 15, 100, 25);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px "Inter", system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(component.language || 'React', 65, 30);
            
            // Title at bottom
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px "Inter", system-ui';
            ctx.textAlign = 'center';
            const title = component.title || 'Modern Component';
            ctx.fillText(title.length > 20 ? title.substring(0, 20) + '...' : title, 200, 275);
            
            resolve(canvas.toDataURL('image/png', 0.9));
            
        } catch (error) {
            console.error('Error generating component type preview:', error);
            resolve(null);
        }
    });
};
