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
            const issues_button = document.querySelector('.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.Mui-selected.css-tf76cc');
            // issues button when on other tabs has different class
            const issues_button_other = document.querySelectorAll('.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.css-tf76cc')
            const issues_button_index = issues_button_other[2]
            if (issues_button) {
                issues_button.click();
            }
            if (issues_button_other) {
                issues_button_index.click();
            }
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

    function SelectAccounts(event)
    {
        if (event.altKey && event.key === 'a')
        {
            // Selects second button with class since dashboard button was identical
            const Accounts_button = document.querySelectorAll('.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.css-tf76cc');
            const secondButton = Accounts_button[1];
            if (Accounts_button)
                secondButton.click();
        }
    }

    document.addEventListener('keydown', resolveAndReopenTicket);
    document.addEventListener('keydown', parkTicket);
    document.addEventListener('keydown', goToIssuesAndBackToActiveIssues);
    document.addEventListener('keydown', newIssue);
    document.addEventListener('keydown', createIssue);
    document.addEventListener('keydown', search);
    document.addEventListener('keydown', selectCommentBox);
    document.addEventListener('keydown', SelectAccounts);
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
           const FA_Icon =  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M418.4 157.9c35.3-8.3 61.6-40 61.6-77.9c0-44.2-35.8-80-80-80c-43.4 0-78.7 34.5-80 77.5L136.2 151.1C121.7 136.8 101.9 128 80 128c-44.2 0-80 35.8-80 80s35.8 80 80 80c12.2 0 23.8-2.7 34.1-7.6L259.7 407.8c-2.4 7.6-3.7 15.8-3.7 24.2c0 44.2 35.8 80 80 80s80-35.8 80-80c0-27.7-14-52.1-35.4-66.4l37.8-207.7zM156.3 232.2c2.2-6.9 3.5-14.2 3.7-21.7l183.8-73.5c3.6 3.5 7.4 6.7 11.6 9.5L317.6 354.1c-5.5 1.3-10.8 3.1-15.8 5.5L156.3 232.2z"/></svg>"></i>'


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
            title: '<span style="font-size: 24px; color: #ffffff; font-weight: bold; padding-right: 26px; "><i class="fa-solid fa-circle-nodes" style="margin-right: 8px;"></i>IMS+</span>',
            html: `
               <div style="text-align: left; color: white; font-family: 'Arial', sans-serif;">
                <div style="margin-top: 12px;font-size: 20px; margin-bottom: 25px; text-align: center; padding: 10px; background-color: #333; color: #fff; border-radius: 5px; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);"><strong>Shortcuts</strong></div>
                <div style="margin-bottom: 10px; font-size: 18px;">
                    <strong>Ctrl + Enter:</strong> Resolve & Re-Open Ticket
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Alt + Enter:</strong> Park Ticket
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Ctrl + I:</strong> Go to Issues & Back to Active
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
                <div style="margin-bottom: 10px;">
                    <strong>Alt + A:</strong> Go to Accounts
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
