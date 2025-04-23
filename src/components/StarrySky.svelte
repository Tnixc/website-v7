<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Store animation start time to calculate consistent animation progress
  let animationStartTime = null;
  let animationFrameId = null;
  
  // Constants for star field
  const STAR_FIELD_WIDTH = 2560;
  const STAR_FIELD_HEIGHT = 2560;
  const STAR_COUNTS = {
    small: 1700,
    medium: 700,
    large: 200
  };
  
  // Animation durations from CSS variables
  const DURATIONS = {
    small: 100, // seconds
    medium: 125,
    large: 175
  };
  
  onMount(() => {
    // Generate star fields
    generateAllStarFields();
    
    // Initialize animation with preserved state
    if (!animationStartTime) {
      animationStartTime = Date.now();
    }
    
    // Start animation loop
    startAnimationLoop();
  });
  
  onDestroy(() => {
    // Clean up animation frame when component is destroyed
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
  
  function startAnimationLoop() {
    // Animation loop function
    function animate() {
      applyAnimationProgress();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Start the animation loop
    animate();
  }
  
  function generateStarField(numStars) {
    const stars = [];
    
    for (let i = 0; i < numStars; i++) {
      const x = Math.floor(Math.random() * STAR_FIELD_WIDTH);
      const y = Math.floor(Math.random() * STAR_FIELD_HEIGHT);
      stars.push(`${x}px ${y}px #FFF`);
    }
    
    return stars.join(', ');
  }
  
  function generateAllStarFields() {
    const starsElements = [
      { selector: '.stars', count: STAR_COUNTS.small },
      { selector: '.stars:after', count: STAR_COUNTS.small },
      { selector: '.stars1', count: STAR_COUNTS.medium },
      { selector: '.stars1:after', count: STAR_COUNTS.medium },
      { selector: '.stars2', count: STAR_COUNTS.large },
      { selector: '.stars2:after', count: STAR_COUNTS.large },
    ];
    
    starsElements.forEach(({ selector, count }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.boxShadow = generateStarField(count);
      }
    });
  }
  
  function applyAnimationProgress() {
    // Calculate elapsed time since animation started
    const elapsedSeconds = (Date.now() - animationStartTime) / 1000;
    
    // Apply animation progress to each star layer
    const starLayers = [
      { element: '.stars', duration: DURATIONS.small },
      { element: '.stars1', duration: DURATIONS.medium },
      { element: '.stars2', duration: DURATIONS.large }
    ];
    
    starLayers.forEach(({ element, duration }) => {
      const el = document.querySelector(element);
      if (el) {
        // Calculate progress percentage (0-1) based on elapsed time and animation duration
        const progress = (elapsedSeconds % duration) / duration;
        
        // Calculate transform values based on progress
        const maxY = -1 * STAR_FIELD_HEIGHT;
        const maxX = -1 * STAR_FIELD_WIDTH;
        const translateY = progress * maxY;
        const translateX = progress * maxX;
        
        // Apply custom animation state
        el.style.animation = 'none';
        el.style.transform = `translateY(${translateY}px) translateX(${translateX}px)`;
      }
    });
  }
</script>

<div class="container">
  <div class="stars"></div>
  <div class="stars1"></div>
  <div class="stars2"></div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  /* Stars */
  .stars {
    z-index: 10;
    width: 1px;
    height: 1px;
    border-radius: 0;
    background: transparent;
    rotate: 45deg;
    position: absolute;
    top: 0;
    left: 0;
  }
  .stars:after {
    content: ' ';
    top: -600px;
    width: 1px;
    height: 1px;
    border-radius: 0;
    position: absolute;
    background: transparent;
    rotate: 45deg;
  }

  .stars1 {
    z-index: 10;
    width: 2px;
    height: 2px;
    border-radius: 0;
    background: transparent;
    rotate: 45deg;
    position: absolute;
    top: 0;
    left: 0;
  }
  .stars1:after {
    content: ' ';
    top: -600px;
    width: 2px;
    height: 2px;
    border-radius: 0;
    position: absolute;
    background: transparent;
    rotate: 45deg;
  }

  .stars2 {
    z-index: 10;
    width: 3px;
    height: 3px;
    border-radius: 0;
    background: transparent;
    rotate: 45deg;
    position: absolute;
    top: 0;
    left: 0;
  }
  .stars2:after {
    content: ' ';
    top: -600px;
    width: 3px;
    height: 3px;
    border-radius: 0;
    position: absolute;
    background: transparent;
    rotate: 45deg;
  }
</style>