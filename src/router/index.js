import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'

import workFlow from '@/components/workFlow.vue';
import dataLink from '@/components/dataLink.vue';
import formCreate from '@/components/formCreate.vue';
import formLogic from '@/components/formLogic.vue';
import viewPage from '@/components/viewPage.vue';

Vue.use(Router)
export const router = new Router({
	//	mode: 'history',
	routes: [{
		path: '/',
		name: 'main',
		component: main,
		meta: {
			title: "医疗信息化工作流开发平台"
		},
		children: [{
			path: '/workFlow',
			name: 'workFlow',
			meta: {
				title: "编辑工作流"
			},
			component: workFlow
		}, {
			path: '/workNode/dataLink',
			name: 'dataLink',
			meta: {
				title: "编辑关联数据"
			},
			component: dataLink
		}, {
			path: '/workNode/formCreate',
			name: 'formCreate',
			meta: {
				title: "编辑表单内容"
			},
			component: formCreate
		}, {
			path: '/workNode/formLogic',
			name: 'formLogic',
			meta: {
				title: "编辑表单逻辑"
			},
			component: formLogic

		}, {
			path: '/viewPage',
			name: 'viewPage',
			meta: {
				title: "预览表单"
			},
			component: viewPage
		}]
	}]
})

router.beforeEach((to, from, next) => {
	let title = to.meta.title;
	let iTitle = this.a.options.routes[0].meta.title;
	if(title) {
		iTitle = title + '-' + iTitle;
	}
	window.document.title = iTitle;

	if(to.name == 'main') {
		next({
			name: "workFlow"
		})
	} else {
		next();
	}
})