import { router } from '@artevelde-uas/canvas-lms-app';
import customProtocolCheck from 'custom-protocol-check';

import __ from './i18n';

import styles from './index.module.css';


export default function () {
    router.onRoute('courses.*', () => {
        document.addEventListener('click', event => {
            const link = event.target.closest('a[href^="https://teams.microsoft.com/l/meetup-join/"]');

            // Only handle clicks on MS Teams links
            if (link === null) return;

            const popup = link.closest(`#${styles.msteamsLinkPopup}`);

            // Don't do anything if the pop-up is allready being shown
            if (popup !== null) return;

            event.preventDefault();

            // Generate a MS Teams link with correct protocol
            const url = link.href;
            const teamsUrl = url.replace(/^https?:\/\//, 'msteams://');

            // Bind the current cursor styles to the cursor reset function
            const cursorReset = (function (bodyCursor, linkCursor) {
                document.body.style.cursor = bodyCursor;
                link.style.cursor = linkCursor;
            }).bind(null, document.body.style.cursor, link.style.cursor);

            // Show 'progress' cursus style
            document.body.style.cursor = 'progress';
            link.style.cursor = 'progress';

            // Detect whether the focus is stolen. If so, assume that the 'msteams:' protocol launches the MS Teams app
            customProtocolCheck(teamsUrl, () => {
                console.warn('Microsoft Teams is not installed');

                // Show a pop-up to download MS Teams or go to web view if not successful
                document.body.insertAdjacentHTML('beforeend', `
                    <div id="${styles.msteamsLinkPopup}" style="top:${event.clientY + 24}px; left:${event.clientX + 24}px">
                        <p>
                            ${__('ms_teams_not_installed')}<br />
                            ${__('download_desktop_app')}
                        </p>
                        <div>
                            <a class="btn btn-primary" href="https://teams.microsoft.com/downloads" target="_blank">
                                <i class="icon-download"></i>
                                ${__('download_teams')}
                            </a>
                            <a class="btn" href="${url}" target="_blank" rel="noreferrer noopener">
                                ${__('open_in_browser')}
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

            // Close pop-up if mouse is pressed outside pop-up
            if (!popup.contains(event.target)) {
                popup.remove();

                return;
            }

            // If a button is pressed, add a click handler to close pop-up
            if (event.target.closest('a') !== null) {
                popup.addEventListener('click', event => {
                    popup.remove();
                }, { once: true });
            }
        }, { useCapture: true });
    });

    return {
        ...require('../package.json'),
        title: __('package.title'),
        description: __('package.description')
    };
}
