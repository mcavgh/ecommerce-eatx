import React, { useEffect } from 'react';

const ParticleBackground = ({ 
    particleColor = 'rgba(195, 0, 255, 0.36) ', 
    backgroundColor = "linear-gradient(135deg,rgb(83, 0, 73) 0%,rgb(235, 169, 138) 100%)",
    particleCount = 50,
    enableHover = true,
    animationSpeed = 100
}) => {
    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posición inicial aleatoria en la parte inferior
            const startX = Math.random() * 100;
            const startY = 100; // Siempre empezar desde abajo
            
            // Velocidad hacia adelante (hacia arriba)
            const speed = Math.random() * 1 + 2; // 2 a 5 segundos
            const horizontalDrift = (Math.random() - 0.5) * 1; // Ligero movimiento horizontal
            
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${particleColor};
                border-radius: 50%;
                left: ${startX}%;
                top: ${startY}%;
                pointer-events: ${enableHover ? 'auto' : 'none'};
                opacity: 1;
                transition: all 0.3s ease;
                --horizontal-drift: ${horizontalDrift}px;
                animation: spaceTravel ${speed}s linear infinite;
                box-shadow: 0 0 6px ${particleColor};
            `;
            
            if (enableHover) {
                // Efecto de escape al hacer hover
                particle.addEventListener('mouseenter', function(event) {
                    const rect = this.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    // Calcular dirección de escape desde el cursor
                    const escapeX = (centerX - event.clientX) * 5;
                    const escapeY = (centerY - event.clientY) * 5;
                    
                    this.style.transform = `translate(${escapeX}px, ${escapeY}px) scale(1.5)`;
                    this.style.opacity = '0.3';
                });
                
                particle.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0) scale(1)';
                    this.style.opacity = '1';
                });
            }
            
            const container = document.getElementById('particles-container');
            if (container) {
                container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, speed * 1000 + 1000); // Tiempo de vida basado en la velocidad
            }
        };
        
        const interval = setInterval(createParticle, animationSpeed);
        
        return () => {
            clearInterval(interval);
            const container = document.getElementById('particles-container');
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [particleColor, animationSpeed, enableHover]);
    
    return (
        <>
            <div 
                id="particles-container"
                style={{
                    //position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    background: backgroundColor,
                    overflow: 'hidden'
                }}
            >
                <style>
                    {`
                        @keyframes spaceTravel {
                            0% {
                                transform: translateY(0) translateX(0) rotate(0deg);
                                opacity: 0;
                            }
                            10% {
                                opacity: 1;
                            }
                            90% {
                                opacity: 1;
                            }
                            100% {
                                transform: translateY(-100vh) translateX(var(--horizontal-drift)) rotate(360deg);
                                opacity: 0;
                            }
                        }
                        
                        .particle {
                            cursor: ${enableHover ? 'pointer' : 'default'};
                        }
                        
                        .particle:hover {
                            box-shadow: 0 0 12px ${particleColor};
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default ParticleBackground;