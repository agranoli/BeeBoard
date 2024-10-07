document.addEventListener('DOMContentLoaded', () => {
    const beeBoard = document.querySelector('.bee-board');
    const animationContainer = document.querySelector('.ios-animation');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(255, 255, 255, 0.7)');
    path.setAttribute('stroke-width', '3');

    circle.setAttribute('r', '6');
    circle.setAttribute('fill', 'rgba(255, 255, 255, 0.9)');

    svg.appendChild(path);
    svg.appendChild(circle);
    animationContainer.appendChild(svg);

    function updatePath() {
        const rect = beeBoard.getBoundingClientRect();
        const radius = 4; // Match the border-radius of .bee-board
        const pathD = `M${radius},0 H${rect.width - radius} Q${rect.width},0 ${rect.width},${radius} V${rect.height - radius} Q${rect.width},${rect.height} ${rect.width - radius},${rect.height} H${radius} Q0,${rect.height} 0,${rect.height - radius} V${radius} Q0,0 ${radius},0`;
        path.setAttribute('d', pathD);
    }

    updatePath();
    window.addEventListener('resize', updatePath);

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    function animatePoint() {
        const duration = 4000; // 4 seconds for a full rotation
        const start = performance.now();

        function step(timestamp) {
            const elapsed = timestamp - start;
            const progress = (elapsed % duration) / duration;
            path.style.strokeDashoffset = pathLength * (1 - progress);

            const point = path.getPointAtLength(pathLength * progress);
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    animatePoint();
});