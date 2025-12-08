import React from 'react'
import { getResourcesV2, getResourceCategoriesV2 } from '../requests/requests'
import ResourcesContent from './ResourcesContent'

const Resources = async () => {
    const resources = await getResourcesV2();
    const categories = await getResourceCategoriesV2();

    return <ResourcesContent initialResources={resources} categories={categories} />
}

export default Resources