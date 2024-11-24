import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard', () => {
  it('should render component', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          id: 1,
          name: 'Product 1',
          description: 'Description',
          price: 10,
          image: 'image.png',
          category: 'Category 1'
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})