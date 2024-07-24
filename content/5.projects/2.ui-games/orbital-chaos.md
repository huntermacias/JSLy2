---
title: Orbital Chaos
description: 'Welcome to the detailed documentation of the Gravity Game. This game simulates particles being attracted to gravity points on a canvas. The particles follow realistic physics and create visually engaging trails.'
---

## Introduction

This game involves particles moving under the influence of gravity points. When particles get too close to a gravity point, they get absorbed, and the gravity point's mass increases. This documentation provides a detailed explanation of the code, helping you understand how each part contributes to the overall functionality.

## Vector Class

The `Vector` class provides utility functions for vector mathematics, essential for simulating physics in the game.

```js [script.js] copy
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const len = this.length();
    if (len) {
      this.scale(1 / len);
    }
    return this;
  }

  distanceTo(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
```

### Methods
<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><code>add(v)</code> Adds another vector to the current vector.</li>
    <li><code>subtract(v)</code> Subtracts another vector from the current vector.</li>
    <li><code>scale(s)</code> Scales the vector by a scalar value.</li>
    <li><code>length()</code> Returns the length (magnitude) of the vector.</li>
    <li><code>normalize()</code> Normalizes the vector (makes its length equal to 1).</li>
    <li><code>distanceTo(other)</code> Calculates the distance between the current vector and another vector.</li>


  </ul>
</div>


## Final Completed Code
```html [index.html] copy 
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>rOrbital Chaos</title>
	<link href="style.css" rel="stylesheet" type="text/css" />
	<script src="https://cdn.tailwindcss.com"></script>
</head>

	<body class="bg-black">
		<main class='info'>
			<canvas  id="gravCanvas"></canvas>
		</main>

		
		<script src="script.js"></script>
	</body>

</html>
```

```js [script.js] copy 
/**
 * Vector utilities for physics calculations
 */
class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	scale(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize() {
		const len = this.length();
		if (len) {
			this.scale(1 / len);
		}
		return this;
	}

	distanceTo(other) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
}

/**
 * GravityPoint with absorption, growth mechanics, and color
 */
class GravityPoint extends Vector {
	constructor(x, y, mass, canvasContext, color) {
		super(x, y);
		this.mass = mass;
		this.context = canvasContext;
		this.radius = Math.sqrt(this.mass) * 2; // Dynamic radius based on mass
		this.color = color;
	}

	draw() {
		this.context.fillStyle = this.color;
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.context.fill();
	}

	attract(other) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		const distance = this.distanceTo(other);

		if (distance < this.radius + other.radius && distance > 0) {
			this.mass += other.mass;
			this.radius = Math.sqrt(this.mass) * 2;
			return true;
		} else {
			const force = (this.mass * other.mass) / (distance * distance);
			const acceleration = force / this.mass;

			const normX = dx / distance;
			const normY = dy / distance;

			other.x -= normX * acceleration * (this.mass / other.mass);
			other.y -= normY * acceleration * (this.mass / other.mass);
		}

		return false;
	}
}

/**
 * Particle class that orbits gravity points with trailing effect
 */
class Particle extends Vector {
	constructor(x, y, canvasContext) {
		super(x, y);
		this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
		this.context = canvasContext;
		this.trail = [];
		this.maxTrailSize = 30;
	}

	update(gravityPoints) {
		const gravityStrength = 3.1;
		const speedLimit = 12;
		const damping = 0.98;
		const repulsionThreshold = 10;
		const repulsionStrength = 1000;

		gravityPoints.forEach(point => {
			const direction = new Vector(point.x - this.x, point.y - this.y);
			const distance = direction.length();
			if (distance < repulsionThreshold) {
				const repulsionForce = (repulsionStrength / (distance * distance)) * gravityStrength;
				direction.normalize().scale(-repulsionForce);
			} else {
				const forceMagnitude = (point.mass / (distance * distance)) * gravityStrength;
				direction.normalize().scale(forceMagnitude);
			}
			this.velocity.add(direction);
		});

		if (this.velocity.length() > speedLimit) {
			this.velocity.normalize().scale(speedLimit);
		}

		this.velocity.scale(damping);
		this.add(this.velocity);

		if (this.x < 0 || this.x > this.context.canvas.width || this.y < 0 || this.y > this.context.canvas.height) {
			this.velocity.scale(-1);
		}

		this.trail.push({ x: this.x, y: this.y });
		if (this.trail.length > this.maxTrailSize) {
			this.trail.shift();
		}
	}

	draw() {
		this.context.fillStyle = 'rgba(255, 255, 255, 0.6)';
		this.context.beginPath();
		this.context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
		this.context.fill();

		for (let i = 0; i < this.trail.length - 1; i++) {
			this.context.beginPath();
			this.context.moveTo(this.trail[i].x, this.trail[i].y);
			this.context.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
			this.context.strokeStyle = `rgba(255, 255, 255, ${1 - i / this.trail.length})`;
			this.context.stroke();
		}
	}
}

/**
 * Main simulation setup
 */
(function () {
	const canvas = document.getElementById('gravCanvas');
	const context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const particles = [];
	const gravityPoints = [];
	let maxMassPoint = null;

	canvas.addEventListener('click', event => {
		const randomMass = 80 + Math.random() * 40;
		const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
		const newPoint = new GravityPoint(event.clientX, event.clientY, randomMass, context, randomColor);
		gravityPoints.push(newPoint);
		if (!maxMassPoint || newPoint.mass > maxMassPoint.mass) {
			maxMassPoint = newPoint;
		}
	});

	for (let i = 0; i < 200; i++) {
		particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, context));
	}

	function animate() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		particles.forEach(particle => {
			particle.update(gravityPoints);
			particle.draw();
		});

		for (let i = 0; i < gravityPoints.length; i++) {
			for (let j = i + 1; j < gravityPoints.length; j++) {
				if (gravityPoints[i].attract(gravityPoints[j])) {
					gravityPoints.splice(j, 1);
					j--;
				}
			}
		}

		gravityPoints.forEach(point => point.draw());

		if (maxMassPoint) {
			maxMassPoint.x += (canvas.width / 2 - maxMassPoint.x) * 0.05;
			maxMassPoint.y += (canvas.height / 2 - maxMassPoint.y) * 0.05;
		}

		requestAnimationFrame(animate);
	}

	animate();
})();
```