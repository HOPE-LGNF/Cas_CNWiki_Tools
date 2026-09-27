/*
 * Cas_CNWiki_Tools 共享工具库
 * 各工具页共用的基础函数，通过全局 CasWiki 命名空间访问。
 */
(function(global) {
    'use strict';

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeRegex(s) {
        return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 复制文本：优先 Clipboard API，失败降级到隐藏 textarea + execCommand。
    // 返回 Promise<boolean>，成功/失败的 UI 反馈由调用方决定。
    function copyText(text) {
        return new Promise(function(resolve) {
            function fallback() {
                try {
                    var ta = document.createElement('textarea');
                    ta.value = text;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    ta.style.left = '-9999px';
                    ta.style.top = '-9999px';
                    document.body.appendChild(ta);
                    ta.select();
                    var ok = document.execCommand('copy');
                    document.body.removeChild(ta);
                    resolve(!!ok);
                } catch (e) {
                    resolve(false);
                }
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function() {
                    resolve(true);
                }, fallback);
            } else {
                fallback();
            }
        });
    }

    global.CasWiki = {
        escapeHtml: escapeHtml,
        escapeRegex: escapeRegex,
        copyText: copyText
    };
})(window);
