<script setup>

import GetAllForm from './components/Forms/GetAllForm.vue';
import GetOneByIdForm from './components/Forms/GetOneByIdForm.vue';
import PostForm from './components/Forms/PostForm.vue';
import PutByIdForm from './components/Forms/PutByIdForm.vue';
import DeleteByIdForm from './components/Forms/DeleteByIdForm.vue';

import RequestContainer from './components/RequestContainer.vue';

import {useUserStore} from './stores/user.js';
import Login from './components/Login.vue';

const store = useUserStore();

</script>

<template>
	<Login v-if="!store.isLoggedIn"/>
	<div class="main-wrapper" v-if="store.isLoggedIn">
		<div class="request-container">
			<RequestContainer request-title="get" request-string="/students/">
				<template v-slot:form>
					<GetAllForm/>
				</template>
			</RequestContainer>
		</div>
		
		<div class="request-container">
			<RequestContainer request-title="get" request-string="/students/:id">
				<template v-slot:form>
					<GetOneByIdForm/>
				</template>
			</RequestContainer>
		</div>
		
		<div class="request-container">
			<RequestContainer request-title="post" request-string="/students/">
				<template v-slot:form>
					<PostForm/>
				</template>
			</RequestContainer>
		</div>
		
		<div class="request-container">
			<RequestContainer request-title="put" request-string="/students/:id">
				<template v-slot:form>
					<PutByIdForm/>
				</template>
			</RequestContainer>
		</div>
		
		<div class="request-container">
			<RequestContainer request-title="delete" request-string="/students/:id">
				<template v-slot:form>
					<DeleteByIdForm/>
				</template>
			</RequestContainer>
		</div>
	</div>
</template>

<style scoped>
.request-container {
	margin-bottom: 30px;
	padding-bottom: 30px;
	border-bottom: 3px solid rgb(212, 212, 212);
}
</style>
