import Image from 'next/image'
import Link from 'next/link'
Image
import React from 'react'

export default function ProductItem({ product }) {
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`} legacyBehavior>
        <a>
          <Image src={product.image} width={500} height={500} alt={product.name} className="rounded shadow" />
        </a>
      </Link>
      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.slug}`} legacyBehavior>
          <a>
            <h2 className='text-lg'>
              {product.name}
            </h2>
          </a>
        </Link>
        <p className='mb-2'>{product.brand}</p>
        <p>${product.price}</p>
        <button className='primary-button' type='button'>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
