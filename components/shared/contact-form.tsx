"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PrimaryButton } from "./primary-button"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-white">Discuss Your Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="company"
              placeholder="Company/Studio"
              value={formData.company}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
              required
            >
              <option value="">Project Type</option>
              <option value="mobile">Mobile Game</option>
              <option value="pc">PC/Web Game</option>
              <option value="vr">VR/AR Game</option>
              <option value="asset">2D/3D Assets</option>
              <option value="other">Other</option>
            </select>
          </div>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 w-full"
          >
            <option value="">Budget Range</option>
            <option value="5-15">$5K-15K</option>
            <option value="15-50">$15K-50K</option>
            <option value="50-100">$50K-100K</option>
            <option value="100+">$100K+</option>
          </select>
          <Textarea
            name="message"
            placeholder="Tell us about your game project details..."
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
            required
          />
          <PrimaryButton size="lg" className="w-full">
            Send Proposal
          </PrimaryButton>
        </form>
      </CardContent>
    </Card>
  )
}
