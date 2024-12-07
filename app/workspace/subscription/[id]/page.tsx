"use client"

import { useParams } from "next/navigation"
import { SubscriptionForm } from "@/components/subscription/subscription-form"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function SubscriptionEditPage() {
  const params = useParams()
  const id = params.id as string
  const items  =[
    { label: "Workspace", href: "/workspace" },
    { label: "Edit Subscription", href: `/workspace/subscription/${id}` },
  ]
    
  return (
    <div className="container mx-auto px-4 py-8">
          <Breadcrumb>
              <BreadcrumbList>
                  {items.map((item, index) => (
                      <>
                        <BreadcrumbItem key={index}>
                          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                          </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                  ))}

              </BreadcrumbList>
          </Breadcrumb>
      
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8">Edit Subscription</h1>
        <SubscriptionForm id={id} />
      </div>
    </div>
  )
}