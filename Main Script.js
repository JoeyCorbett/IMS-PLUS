// ==UserScript==
// @name         IMS+
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Provides functionality to IMS including Shortcuts/Visual Improvements
// @author       JoeyCorbett
// @author       TylerMong
// @match        https://ims.stockton.edu/*
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@10
// @require      https://kit.fontawesome.com/f54d2a88b1.js
// @grant        none
// ==/UserScript==

// SHORTCUTS

(function()
{
    'use strict';

    function resolveAndReopenTicket(event)
    {
        if (event.ctrlKey && event.key === 'Enter')
        {
            const ResolveButton = document.querySelectorAll('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedWarning.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButtonBase-root.css-juwm2b');
            ResolveButton.forEach(button =>
            {
                button.click();
            });
        }
        if (event.ctrlKey && event.key === 'Enter')
        {
            const ReOpenButton = document.querySelectorAll('.MuiButton-root.MuiButton-text.MuiButton-textInherit.MuiButton-sizeSmall.MuiButton-textSizeSmall.MuiButton-colorInherit.MuiButtonBase-root.css-zxpq4x');
            ReOpenButton.forEach(button =>
            {
                button.click();
            });
        }
    }

    function parkTicket(event)
    {
        if (event.altKey && event.key === 'Enter')
        {
            const buttons = document.querySelectorAll('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedAmber.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButtonBase-root.css-1rqew9l');
            buttons.forEach(button=>
            {
                button.click();
            });
        }
    }

    function goToIssuesAndBackToActiveIssues(event)
    {
        if (event.ctrlKey && event.key === 'i')
        {
            const button = document.querySelector('.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.Mui-selected.css-tf76cc');
            if (button)
                button.click();
            // Function which adds ability to go "back to active issues" with same shortcut
        }
        if (event.ctrlKey && event.key === 'i')
        {
            const active_issues_button = document.querySelector('.MuiButton-root.MuiButton-text.MuiButton-textSecondary.MuiButton-sizeSmall.MuiButton-textSizeSmall.MuiButtonBase-root.css-lkn55r');
            if (active_issues_button)
                active_issues_button.click();
        }
    }

    function newIssue(event)
    {
        if (event.altKey && event.key === 'n')
        {
            const buttons = document.querySelectorAll('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedInherit.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButton-colorInherit.MuiButtonBase-root.css-1hufckp');
            buttons.forEach(button =>
            {
                button.click();
            });
        }
    }

    function createIssue(event)
    {
        if (event.altKey && event.key === 'c')
        {
            const button = document.querySelector('.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButtonBase-root.css-10a8m5l');
            if (button)
                button.click();
        }
    }

    function search(event)
    {
        if (event.altKey && event.key === 's')
        {
            const inputField = document.querySelector('.MuiInput-input.MuiInputBase-input.css-1jhxu0');
            if (inputField)
                inputField.focus();
        }
    }

    function selectCommentBox(event)
    {
        if (event.ctrlKey && event.key === '\\')
        {
            const textarea = document.querySelector('textarea.MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-inputMultiline.MuiInputBase-inputAdornedEnd.css-1flw2lc');
            if (textarea)
                textarea.select();
        }
    }

    document.addEventListener('keydown', resolveAndReopenTicket);
    document.addEventListener('keydown', parkTicket);
    document.addEventListener('keydown', goToIssuesAndBackToActiveIssues);
    document.addEventListener('keydown', newIssue);
    document.addEventListener('keydown', createIssue);
    document.addEventListener('keydown', search);
    document.addEventListener('keydown', selectCommentBox);
})();


// GUI

(function ()
{
    'use strict';

    const targetClass = "MuiList-root css-1uzmcsd";

    let buttonCreated = false;

    const observer = new MutationObserver(mutationsList =>
    {
        for (const mutation of mutationsList)
        {
            if (!buttonCreated && mutation.type === 'childList' && mutation.addedNodes.length)
            {
                createButton();
                buttonCreated = true;
            }
        }
    });

    function createButton()
    {
        const targetElements = document.getElementsByClassName(targetClass);
        const targetElement = targetElements[0];
        if (targetElement)
        {
            const originalElement = document.querySelector("#root > div.css-toeiso > div.css-my7rni > ul > div.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.css-tf76cc");
            const clonedElement = originalElement.cloneNode(true);

            const textElement = clonedElement.querySelector('.MuiListItemText-primary');
            textElement.textContent = 'IMS+';

            targetElement.appendChild(clonedElement);

            // Load Font Awesome Icon
           const fontAwesomeScript = document.createElement('script');
           fontAwesomeScript.crossOrigin = 'anonymous';
           const FA_Icon =  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M224 16c-' +
               '6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3' +
               ' 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29' +
               '.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416' +
               ' 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12' +
               '.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176' +
               ' 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"/></svg>"></i>'


            // Replace with SVG Icon Path
            const svgElement = clonedElement.querySelector('svg');
            svgElement.innerHTML = FA_Icon;
            targetElement.appendChild(clonedElement)


            // Initialize ID for cloned element for
            clonedElement.id = 'IMS++_Button'

            // Add event listener to button and call function
            const IMS_Button = document.getElementById('IMS++_Button');
            IMS_Button.addEventListener("click", ShowAlert)
        }
    }

    // Adds framework styling to alert box
    function ShowAlert()
    {
        Swal.fire({
            title: '<span style="font-size: 24px; color: white;">IMS+</span>',
            html: `
               <div style="text-align: left; color: white; font-family: 'Arial', sans-serif;">
                <div style="font-size: 20px; margin-bottom: 15px;"><strong>Shortcuts</strong></div>
                <div style="margin-bottom: 10px; font-size: 18px;">
                    <strong>Ctrl + Enter:</strong> Resolve/Re-Open Ticket
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Alt + Enter:</strong> Park Ticket
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Ctrl + I:</strong> Go to Issues/Back to Active
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Alt + N:</strong> New Issue
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Alt + C:</strong> Create Issue
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Alt + S:</strong> Search
                </div>
                <div>
                    <strong>Ctrl + \\:</strong> Select Comment Box
                </div>
            `,
            icon: "info",
            background: '#2b2b2b',
            confirmButtonText: 'Gotcha!',
            footer: '<a href="https://github.com/JoeyCorbett/IMS-PLUS" style="color: #ffffff; text-decoration: none; font-weight: bold; transition: border-bottom 0.3s; display: flex; align-items: center;"><i class="fab fa-github" style="margin-right: 5px; color: white;"></i>Stay Updated</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://docs.google.com/forms/d/e/1FAIpQLSe049WraemkVfrs9c0naKc3w8DmFLVjAzLVH8eSoIz46GCdRg/viewform?usp=sf_link" style="color: #ffffff; text-decoration: none; font-weight: bold; transition: border-bottom 0.3s; display: flex; align-items: center;"><i class="fa-regular fa-comment" style="margin-right: 5px; color: white;"></i>Feedback Form</a>',
            customClass: {
                popup: 'dark-popup',
            },
        });
        //alert(shortcut_display);
    }
    const targetElement = document.body;
    observer.observe(targetElement, { childList: true, subtree: true });
})();

// Visual Tweaks

(function ()
{
    // Fixes the parked banner on dark theme
    // NEED TO CHECK IF USER IS USING DARK THEME
    // Function which checks data-test id and changes parked/resolved tickets color accordingly
    function fixParked_ResolvedColorSchemes(targetNode) {
        const targetElement = targetNode.querySelector('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiAlert-root.MuiAlert-outlinedWarning.MuiAlert-outlined.css-bf6pz0');
        const ParkedIcon = document.querySelector('[data-testid="SnoozeIcon"]');
        if (ParkedIcon && targetElement) {
            targetElement.style.color = '#c9d1d9';
            targetElement.style.backgroundColor = '#0d1117';
        }
        const ResolvedIcon = document.querySelector('[data-testid="ReportProblemOutlinedIcon"]');
        if (ResolvedIcon && targetElement) {
            targetElement.style.color = '#c9d1d9';
            targetElement.style.border = '1.1px solid #00897b';
            targetElement.style.backgroundColor = '#0d1117';
        }
    }

    // Changes Elevated Tickets color to brighter blue for better visibility
    function fixElevatedColorSchemes(targetNode)
    {
        const ElevatedTickets = targetNode.querySelectorAll('.jss4.jss7.jss5')
        if (ElevatedTickets.length > 0) {
            ElevatedTickets.forEach(function (element) {
                element.style.backgroundColor = '#0a2130';
            })
        }
    }

    // Create a MutationObserver to observe changes in the DOM
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length) {
                // Check added nodes for the target element
                fixParked_ResolvedColorSchemes(mutation.target);
                fixElevatedColorSchemes(mutation.target);
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

})();
