// ==UserScript==
// @name         IMS Visual Tweaks
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Adds visual tweaks to IMS
// @author       JoeyCorbett
// @author       TylerMong
// @match        https://ims.stockton.edu/*
// @grant        none
// ==/UserScript==

(function ()
{
    function fixParkedColorScheme(targetNode)
    {
        const targetElement = targetNode.querySelector('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiAlert-root.MuiAlert-outlinedWarning.MuiAlert-outlined.css-bf6pz0');
        if (targetElement)
        {
            targetElement.style.color = '#c9d1d9';
            targetElement.style.backgroundColor = '#0d1117';
        }
    }

    const observer = new MutationObserver(mutationsList =>
    {
        for (const mutation of mutationsList)
        {
            if (mutation.addedNodes.length)
                fixParkedColorScheme(mutation.target);
        }
    });

    function reconnectObserver()
    {
        observer.disconnect();
        observer.observe(document.body, { childList: true, subtree: true });
    }

    reconnectObserver();
})();