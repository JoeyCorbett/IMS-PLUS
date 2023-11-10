// ==UserScript==
// @name         IMS Keyboard Shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Provides keyboard shortcuts for common actions
// @author       JoeyCorbett
// @author       TylerMong
// @match        https://ims.stockton.edu/*
// @grant        none
// ==/UserScript==

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