// ==UserScript==
// @name         Keyboard Shortcuts IMS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Press Alt + Enter, Alt + N, Ctrl + Enter, Ctrl + I, Alt + C to click specific buttons, and Alt + S to focus on a specific input field. Press Ctrl + \ to select a specific textarea field on the webpage.
// @author       You
// @match        https://*/*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to handle keydown event for Alt + Enter
    function handleAltEnter(event) {
        if (event.altKey && event.key === 'Enter') {
            const buttons = document.querySelectorAll('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedAmber.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButtonBase-root.css-1rqew9l');
            buttons.forEach(button => {
                button.click();
            });
        }
    }

    // Function to handle keydown event for Alt + N
    function handleAltN(event) {
        if (event.altKey && event.key === 'n') {
            const buttons = document.querySelectorAll('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedInherit.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButton-colorInherit.MuiButtonBase-root.css-1hufckp');
            buttons.forEach(button => {
                button.click();
            });
        }
    }

    // Function to handle keydown event for Ctrl + Enter
    function handleCtrlEnter(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            const ResolveButton = document.querySelectorAll('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedWarning.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButtonBase-root.css-juwm2b');
            ResolveButton.forEach(button => {
                button.click();
            });
    // Function which adds ability to re-open tickets with same shortcut
        } if (event.ctrlKey && event.key === 'Enter') { 
            const ReOpenButton = document.querySelectorAll('.MuiButton-root.MuiButton-text.MuiButton-textInherit.MuiButton-sizeSmall.MuiButton-textSizeSmall.MuiButton-colorInherit.MuiButtonBase-root.css-zxpq4x');
            ReOpenButton.forEach(button => {
                button.click();
            });
        }
    }

    // Function to handle keydown event for Ctrl + I
    function handleCtrlI(event) {
        if (event.ctrlKey && event.key === 'i') {
            const button = document.querySelector('.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.Mui-selected.css-tf76cc');
            if (button) {
                button.click();
            }
    // Function which adds ability to go "back to active issues" with same shortcut
        } if (event.ctrlKey && event.key == 'i') {
            const active_issues_button = document.querySelector('.MuiButton-root.MuiButton-text.MuiButton-textSecondary.MuiButton-sizeSmall.MuiButton-textSizeSmall.MuiButtonBase-root.css-lkn55r');
            if (active_issues_button) {
                active_issues_button.click();
            }
        }
    }

    // Function to handle keydown event for Alt + C
    function handleAltC(event) {
        if (event.altKey && event.key === 'c') {
            const button = document.querySelector('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButtonBase-root.css-10a8m5l');
            if (button) {
                button.click();
            }
        }
    }

    // Function to handle keydown event for Alt + S
    function handleAltS(event) {
        if (event.altKey && event.key === 's') {
            const inputField = document.querySelector('.MuiInput-input.MuiInputBase-input.css-1jhxu0');
            if (inputField) {
                inputField.focus();
            }
        }
    }

    // Function to handle keydown event for Ctrl + \
    function handleCtrlBackslash(event) {
        if (event.ctrlKey && event.key === '\\') {
            const textarea = document.querySelector('textarea.MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-inputMultiline.MuiInputBase-inputAdornedEnd.css-1flw2lc');
            if (textarea) {
                textarea.select();
            }
        }
    }

    // Fixes the parked banner on dark theme
    // NEED TO CHECK IF USER IS USING DARK THEME
    function fixParkedColorScheme(targetNode) {
        const targetElement = targetNode.querySelector('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiAlert-root.MuiAlert-outlinedWarning.MuiAlert-outlined.css-bf6pz0');
        if (targetElement) {
            targetElement.style.color = '#c9d1d9';
            targetElement.style.backgroundColor = '#0d1117';
        }
    }

    // Create a MutationObserver to observe changes in the DOM
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length) {
                // Check added nodes for the target element
                fixParkedColorScheme(mutation.target);
            }
        }
    });

    // Function to reconnect the observer when a new page is opened
    function reconnectObserver() {
        observer.disconnect();
        observer.observe(document.body, { childList: true, subtree: true });
    }
    // Call the function to reconnect the observer when the page loads
    reconnectObserver();

    // Add event listeners for keydown events
    document.addEventListener('keydown', handleAltEnter);
    document.addEventListener('keydown', handleAltN);
    document.addEventListener('keydown', handleCtrlEnter);
    document.addEventListener('keydown', handleCtrlI);
    document.addEventListener('keydown', handleAltC);
    document.addEventListener('keydown', handleAltS);
    document.addEventListener('keydown', handleCtrlBackslash);

})();
