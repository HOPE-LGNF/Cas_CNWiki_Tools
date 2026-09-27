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

    // 安全高亮：按原文匹配后分段转义，命中部分包 <mark>。
    // 「先转义再替换」的写法会让匹配落进 HTML 实体内部（如搜 "amp" 破坏 &amp;），此处规避。
    function safeHighlight(text, query) {
        if (!query || !text) return escapeHtml(text);
        var parts = String(text).split(new RegExp('(' + escapeRegex(query) + ')', 'gi'));
        var out = '';
        for (var i = 0; i < parts.length; i++) {
            out += (i % 2 === 1)
                ? '<mark>' + escapeHtml(parts[i]) + '</mark>'
                : escapeHtml(parts[i]);
        }
        return out;
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
        safeHighlight: safeHighlight,
        copyText: copyText
    };
})(window);
