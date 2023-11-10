// ==UserScript==
// @name         IMS GUI Elements
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Adds GUI implementation
// @author       JoeyCorbett
// @author       TylerMong
// @match        https://ims.stockton.edu/*
// @grant        none
// ==/UserScript==

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
            textElement.textContent = 'IMS++';

            targetElement.appendChild(clonedElement);
        }
    }

    const targetElement = document.body;
    observer.observe(targetElement, { childList: true, subtree: true });
})();