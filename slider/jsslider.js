/* jsslider-junproger */
		'use strict'
		window.addEventListener('resize', windowInnerWidthSize);
		let controlPoinsNumber = 1;
		const bodyWrapperBlock = document.querySelector('.wrapper');
		const sliderStripBlock = document.querySelector('.sliderstrip');
		bodyWrapperBlock.addEventListener('click', moveSliderItems);
		const setFragments = ['blue', 'green', 'yellow'];
		const dataItems = ['1a', '2b', '3c', '4d', '5e', '6f', '7g', '8h'];
		function setupFragments(side, numb) {
			let fragment = document.createDocumentFragment();
			if (side === 'left') {
				for (let i=1; i<=numb; i++) {
					let item = document.createElement('div');
					item.append('2b');
					item.setAttribute('class', 'slideritem');
					item.style.backgroundColor = setFragments[Math.floor(Math.random() * 3)];
					fragment.append(item);
				};
			} else if (side === 'right') {
				for (let i=1; i<=numb; i++) {
					let item = document.createElement('div');
					item.append('3c');
					item.setAttribute('class', 'slideritem');
					item.style.backgroundColor = setFragments[Math.floor(Math.random() * 3)];
					fragment.append(item);
				};
			}; 
			return fragment;
		};
		function startCreateElements(size, numb) {
			let sliderFrameLength = sliderStripBlock.children.length;
			let sliderItemElement = document.createElement('div');
			sliderItemElement.setAttribute('class', 'slideritem');
			sliderItemElement.style.backgroundColor = 'green';
			if (sliderFrameLength <= controlPoinsNumber) {
				if (size >= 1280 && numb > 0 && sliderFrameLength < 3) {
					sliderItemElement.append('1a');
					sliderStripBlock.append(sliderItemElement);
					return startCreateElements(size, numb -= 1);
				} else if (size >= 768 && numb > 0 && sliderFrameLength < 2) {
					sliderItemElement.append('1a');
					sliderStripBlock.append(sliderItemElement);
					return startCreateElements(size, numb -= 1);
				} else if (size >= 280 && numb > 0 && sliderFrameLength < 1) {
					sliderItemElement.append('1a');
					sliderStripBlock.append(sliderItemElement);
					return startCreateElements(size, numb -= 1);
				};
			} else {
				console.log(sliderFrameLength);
				console.log(controlPoinsNumber);
				sliderStripBlock.lastChild.remove();
				return;
			};
		};
		function windowInnerWidthSize() {
			let innerWidthSize = window.innerWidth;
			innerWidthSize = window.innerWidth;
				if (innerWidthSize >= 1280) {
					controlPoinsNumber = 3;
					console.log('start 3');
					startCreateElements(innerWidthSize, 3);
				} else if (innerWidthSize >= 768) {
					controlPoinsNumber = 2;
					console.log('start 2');
					startCreateElements(innerWidthSize, 2);
				} else if (innerWidthSize >= 280) {
					controlPoinsNumber = 1;
					console.log('start 1');
					startCreateElements(innerWidthSize, 1);
				};
			console.log(innerWidthSize);
			return innerWidthSize;
		};
		windowInnerWidthSize();
		function moveSliderItems(event) {
			if (event.target.className === 'button_arrow_left') {
			sliderStripBlock.classList.add(('transition_left' + controlPoinsNumber));
			sliderStripBlock.prepend(setupFragments('left', controlPoinsNumber));
			bodyWrapperBlock.removeEventListener('click', moveSliderItems);
			console.log('Move Left');
			};
			if (event.target.className === 'button_arrow_right') {
			sliderStripBlock.classList.add(('transition_right' + controlPoinsNumber));
			sliderStripBlock.append(setupFragments('right', controlPoinsNumber));
			bodyWrapperBlock.removeEventListener('click', moveSliderItems);
			console.log('Move Right');
			};
		};
		sliderStripBlock.onanimationend = (animationEvent) => {
			console.log('Animation ended!');
			if (animationEvent.animationName === ('move_left' + controlPoinsNumber)) {
			sliderStripBlock.classList.remove(('transition_left' + controlPoinsNumber));
			let count = 0;
				while (count < controlPoinsNumber) {
					sliderStripBlock.lastElementChild.remove();
					count += 1;
				};
			bodyWrapperBlock.addEventListener('click', moveSliderItems);
			} else if (animationEvent.animationName === ('move_right' + controlPoinsNumber)) {
			sliderStripBlock.classList.remove(('transition_right' + controlPoinsNumber));
			let count = 0;
				while (count < controlPoinsNumber) {
					sliderStripBlock.firstElementChild.remove();
					count += 1;
				};
			bodyWrapperBlock.addEventListener('click', moveSliderItems);
			};
		};