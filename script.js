function getBrowserInfo() {
	return {
		userAgent: navigator.userAgent,
		platform: navigator.platform,
		language: navigator.language,
		cookiesEnabled: navigator.cookieEnabled,
		online: navigator.onLine,
		screenResolution: `${window.screen.width}x${window.screen.height}`,
	};
}

function showBrowserInfoInFooter() {
	const info = JSON.parse(localStorage.getItem('browserInfo') || '{}');
	const footer = document.getElementById('browser-info');
	footer.innerHTML = `
    <strong>Інформація про браузер:</strong><br>
    User Agent: ${info.userAgent}<br>
    Платформа: ${info.platform}<br>
    Мова: ${info.language}<br>
    Cookies увімкнені: ${info.cookiesEnabled}<br>
    Онлайн: ${info.online}<br>
    Роздільна здатність: ${info.screenResolution}
  `;
}

function fetchEmployerComments(postId = 26) {
	fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
		.then((response) => response.json())
		.then((comments) => displayComments(comments));
}

function displayComments(comments) {
	const commentsContainer = document.getElementById('employer-comments');
	if (!commentsContainer) return;

	comments.forEach((comment) => {
		const commentDiv = document.createElement('div');
		commentDiv.classList.add('comment');
		commentDiv.innerHTML = `
      <h4>${comment.email}</h4>
      <p>${comment.body}</p>
    `;
		commentsContainer.appendChild(commentDiv);
	});
}

function applyTheme(theme) {
	document.body.classList.remove('day-theme', 'night-theme');
	document.body.classList.add(`${theme}-theme`);
	localStorage.setItem('theme', theme);
	const switcher = document.getElementById('theme-switch');
	if (switcher) switcher.checked = theme === 'night';
}

function getCurrentTimeTheme() {
	const hour = new Date().getHours();
	return hour >= 7 && hour < 21 ? 'day' : 'night';
}

function initTheme() {
	const theme = getCurrentTimeTheme();
	applyTheme(theme);
}

function setupThemeToggle() {
	const switcher = document.getElementById('theme-switch');
	if (!switcher) return;

	switcher.addEventListener('change', (e) => {
		const newTheme = e.target.checked ? 'night' : 'day';
		applyTheme(newTheme);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const browserInfo = getBrowserInfo();
	localStorage.setItem('browserInfo', JSON.stringify(browserInfo));
	showBrowserInfoInFooter();
	fetchEmployerComments();
	initTheme();
	setupThemeToggle();

	setTimeout(() => {
		const modal = document.getElementById('feedback-modal');
		if (modal) modal.classList.remove('hidden');
	}, 6000); // 60 секунд

	const closeButton = document.querySelector('.close-button');
	if (closeButton) {
		closeButton.addEventListener('click', () => {
			document.getElementById('feedback-modal')?.classList.add('hidden');
		});
	}
});
