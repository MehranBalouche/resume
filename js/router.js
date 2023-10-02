const pageTitle = 'cv'

const router = {
    404: {
        template: "./pages/404.html",
        title: `${pageTitle} | خطای 404`
    },
    '/': {
        template:'./pages/index.html',
        title: `${pageTitle} | خانه`
    },
    '/portfolio': {
        template:'./pages/portfolio.html',
        title: `${pageTitle} | سوابق & تجربیات & نمونه کارها`
    },
    '/about': {
        template:'./pages/about.html',
        title: `${pageTitle} | درباره من`
    },
}

export default router;