import customProtocolCheck from 'custom-protocol-check';


export default function (app, options) {
    app.addRouteListener('courses.*', function (params) {
        document.addEventListener('click', event => {
            let link = event.target.closest('a[href^="https://teams.microsoft.com/l/meetup-join/"]');

            if (link === null) return;

            let popup = link.closest('#msteams-link-popup');

            if (popup !== null) return;

            event.preventDefault();

            let url = link.href;
            let teamsUrl = url.replace(/^https?:\/\//, 'msteams://');

            customProtocolCheck(teamsUrl, () => {
                console.warn('Microsoft Teams is not installed');

                document.body.insertAdjacentHTML('beforeend', `
                    <div id="msteams-link-popup" style="position: absolute; top:${event.clientY + 24}px; left:${event.clientX + 24}px; z-index: 999; background: white; border: 1px solid gray; padding: 1em">
                        <p>
                            <b>Microsoft Teams</b> is not installed.<br />
                            Download the desktop app for the best experience or open in the browser.
                        </p>
                        <div>
                            <a class="btn btn-primary" href="https://teams.microsoft.com/downloads" target="_blank">Download Teams</a>
                            <a class="btn" href="${url}" target="_blank" rel="noreferrer noopener">Open in browser</a>
                        </div>
                    </div>
                `);
            });
        });

        document.addEventListener('mousedown', event => {
            let popup = document.getElementById('msteams-link-popup');

            if (popup === null) return;

            if (popup.contains(event.target)) {
                if (event.target.closest('a') !== null) {
                    popup.addEventListener('click', event => {
                        popup.parentNode.removeChild(popup);
                    }, { once: true });
                }

                return;
            }

            popup.parentNode.removeChild(popup);
        }, { useCapture: true });
    });
}
