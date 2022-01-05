import { router } from '@artevelde-uas/canvas-lms-app';
import customProtocolCheck from 'custom-protocol-check';

import styles from './index.module.css';


export default function () {
    router.onRoute('courses.*', () => {
        document.addEventListener('click', event => {
            const link = event.target.closest('a[href^="https://teams.microsoft.com/l/meetup-join/"]');

            if (link === null) return;

            const popup = link.closest(`#${styles.msteamsLinkPopup}`);

            if (popup !== null) return;

            event.preventDefault();

            const url = link.href;
            const teamsUrl = url.replace(/^https?:\/\//, 'msteams://');

            const cursorReset = (function (bodyCursor, linkCursor) {
                document.body.style.cursor = bodyCursor;
                link.style.cursor = linkCursor;
            }).bind(null, document.body.style.cursor, link.style.cursor);

            document.body.style.cursor = 'progress';
            link.style.cursor = 'progress';

            customProtocolCheck(teamsUrl, () => {
                console.warn('Microsoft Teams is not installed');

                document.body.insertAdjacentHTML('beforeend', `
                    <div id="${styles.msteamsLinkPopup}" style="top:${event.clientY + 24}px; left:${event.clientX + 24}px">
                        <p>
                            <b>Microsoft Teams</b> is not installed.<br />
                            Download the desktop app for the best experience or open in the browser.
                        </p>
                        <div>
                            <a class="btn btn-primary" href="https://teams.microsoft.com/downloads" target="_blank">
                                <i class="icon-download"></i>
                                Download Teams
                            </a>
                            <a class="btn" href="${url}" target="_blank" rel="noreferrer noopener">
                                Open in browser
                            </a>
                        </div>
                    </div>
                `);

                cursorReset();
            }, () => {
                cursorReset();
            });
        });

        document.addEventListener('mousedown', event => {
            const popup = document.getElementById(styles.msteamsLinkPopup);

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
