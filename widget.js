"use client"

// Use global React and ReactDOM from CDN
const React = window.React
const ReactDOM = window.ReactDOM
const { useState, createElement: h } = React

// Icon components
const TrendingUp = () =>
  h(
    "svg",
    {
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    }),
  )

const DollarSign = () =>
  h(
    "svg",
    {
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    }),
  )

const Clock = () =>
  h(
    "svg",
    {
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    h("circle", { cx: "12", cy: "12", r: "10" }),
    h("polyline", { points: "12,6 12,12 16,14" }),
  )

const Target = () =>
  h(
    "svg",
    {
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    h("circle", { cx: "12", cy: "12", r: "10" }),
    h("circle", { cx: "12", cy: "12", r: "6" }),
    h("circle", { cx: "12", cy: "12", r: "2" }),
  )

const CheckCircle = () =>
  h(
    "svg",
    {
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    h("path", { d: "m9 12 2 2 4-4" }),
    h("circle", { cx: "12", cy: "12", r: "10" }),
  )

const XCircle = () =>
  h(
    "svg",
    {
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    h("circle", { cx: "12", cy: "12", r: "10" }),
    h("path", { d: "m15 9-6 6" }),
    h("path", { d: "m9 9 6 6" }),
  )

// UI Components
const Card = ({ children, className = "" }) => h("div", { className: `oxo-card ${className}` }, children)

const CardHeader = ({ children }) => h("div", { className: "oxo-card-header" }, children)

const CardTitle = ({ children, className = "" }) => h("h3", { className: `oxo-card-title ${className}` }, children)

const CardContent = ({ children, className = "" }) => h("div", { className: `oxo-card-content ${className}` }, children)

const Button = ({ children, className = "", onClick, size = "default", variant = "default" }) =>
  h(
    "button",
    {
      className: `oxo-button oxo-button-${variant} oxo-button-${size} ${className}`,
      onClick,
    },
    children,
  )

const Badge = ({ children, className = "", variant = "default" }) =>
  h("span", { className: `oxo-badge oxo-badge-${variant} ${className}` }, children)

const Slider = ({ value, onValueChange, min, max, step, className = "" }) => {
  const handleChange = (e) => {
    onValueChange([Number.parseInt(e.target.value)])
  }

  return h("input", {
    type: "range",
    min,
    max,
    step,
    value: value[0],
    onChange: handleChange,
    className: `oxo-slider ${className}`,
  })
}

// Main ROI Calculator Component
const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    leadCost: 15,
    bounceRate: 20,
    hourlyRate: 50,
    conversionRate: 5,
    dealSize: 10000,
    monthlyLeads: 1000,
    timePerBadLead: 15,
  })

  // Calculation logic
  const wastedCostOnBouncedLeads = ((inputs.monthlyLeads * inputs.bounceRate) / 100) * inputs.leadCost
  const timeWasted =
    ((((inputs.monthlyLeads * inputs.bounceRate) / 100) * inputs.timePerBadLead) / 60) * inputs.hourlyRate

  // Oxo improvements: 95% deliverability (5% bounce), 2x conversion rate
  const oxoflyBounceRate = 5
  const oxoflyConversionRate = inputs.conversionRate * 2

  const oxoflyWastedCost = ((inputs.monthlyLeads * oxoflyBounceRate) / 100) * inputs.leadCost
  const oxoflyTimeWasted =
    ((((inputs.monthlyLeads * oxoflyBounceRate) / 100) * inputs.timePerBadLead) / 60) * inputs.hourlyRate

  const currentRevenue = inputs.monthlyLeads * (inputs.conversionRate / 100) * inputs.dealSize
  const oxoflyRevenue = inputs.monthlyLeads * (oxoflyConversionRate / 100) * inputs.dealSize
  const revenueIncrease = oxoflyRevenue - currentRevenue

  const monthlySavings =
    wastedCostOnBouncedLeads - oxoflyWastedCost + (timeWasted - oxoflyTimeWasted) + revenueIncrease / 12
  const oxoflyCost = 2000 // Assumed annual cost
  const annualROI = monthlySavings * 12 - oxoflyCost
  const paybackPeriod = oxoflyCost / monthlySavings

  const updateInput = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value[0] }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (value) => `${value}%`

  return h("div", { className: "oxo-calculator" }, [
    // Input Controls
    h(Card, { key: "inputs" }, [
      h(
        CardHeader,
        { key: "header" },
        h(CardTitle, { className: "oxo-flex oxo-items-center oxo-gap-2" }, [
          h(Target, { key: "icon" }),
          "Your Current Metrics",
        ]),
      ),
      h(
        CardContent,
        { key: "content" },
        h("div", { className: "oxo-grid oxo-grid-cols-1 md:oxo-grid-cols-2 lg:oxo-grid-cols-3 oxo-gap-6" }, [
          // Lead Cost
          h("div", { key: "leadCost", className: "oxo-space-y-3" }, [
            h("label", { key: "label", className: "oxo-text-sm oxo-font-medium" }, "Current Lead Acquisition Cost"),
            h("div", { key: "value", className: "oxo-input-display" }, formatCurrency(inputs.leadCost)),
            h(Slider, {
              key: "slider",
              value: [inputs.leadCost],
              onValueChange: (value) => updateInput("leadCost", value),
              max: 50,
              min: 1,
              step: 1,
            }),
            h("div", { key: "range", className: "oxo-flex oxo-justify-between oxo-text-xs oxo-text-muted" }, [
              h("span", { key: "min" }, "$1"),
              h("span", { key: "max" }, "$50"),
            ]),
          ]),

          // Bounce Rate
          h("div", { key: "bounceRate", className: "oxo-space-y-3" }, [
            h("label", { key: "label", className: "oxo-text-sm oxo-font-medium" }, "Current Email Bounce Rate"),
            h("div", { key: "value", className: "oxo-input-display" }, formatPercent(inputs.bounceRate)),
            h(Slider, {
              key: "slider",
              value: [inputs.bounceRate],
              onValueChange: (value) => updateInput("bounceRate", value),
              max: 40,
              min: 5,
              step: 1,
            }),
            h("div", { key: "range", className: "oxo-flex oxo-justify-between oxo-text-xs oxo-text-muted" }, [
              h("span", { key: "min" }, "5%"),
              h("span", { key: "max" }, "40%"),
            ]),
          ]),

          // Hourly Rate
          h("div", { key: "hourlyRate", className: "oxo-space-y-3" }, [
            h("label", { key: "label", className: "oxo-text-sm oxo-font-medium" }, "Sales Rep Hourly Rate"),
            h("div", { key: "value", className: "oxo-input-display" }, formatCurrency(inputs.hourlyRate)),
            h(Slider, {
              key: "slider",
              value: [inputs.hourlyRate],
              onValueChange: (value) => updateInput("hourlyRate", value),
              max: 100,
              min: 25,
              step: 5,
            }),
            h("div", { key: "range", className: "oxo-flex oxo-justify-between oxo-text-xs oxo-text-muted" }, [
              h("span", { key: "min" }, "$25"),
              h("span", { key: "max" }, "$100"),
            ]),
          ]),

          // Conversion Rate
          h("div", { key: "conversionRate", className: "oxo-space-y-3" }, [
            h("label", { key: "label", className: "oxo-text-sm oxo-font-medium" }, "Lead-to-Opportunity Conversion"),
            h("div", { key: "value", className: "oxo-input-display" }, formatPercent(inputs.conversionRate)),
            h(Slider, {
              key: "slider",
              value: [inputs.conversionRate],
              onValueChange: (value) => updateInput("conversionRate", value),
              max: 15,
              min: 1,
              step: 0.5,
            }),
            h("div", { key: "range", className: "oxo-flex oxo-justify-between oxo-text-xs oxo-text-muted" }, [
              h("span", { key: "min" }, "1%"),
              h("span", { key: "max" }, "15%"),
            ]),
          ]),

          // Deal Size
          h("div", { key: "dealSize", className: "oxo-space-y-3" }, [
            h("label", { key: "label", className: "oxo-text-sm oxo-font-medium" }, "Average Deal Size"),
            h("div", { key: "value", className: "oxo-input-display" }, formatCurrency(inputs.dealSize)),
            h(Slider, {
              key: "slider",
              value: [inputs.dealSize],
              onValueChange: (value) => updateInput("dealSize", value),
              max: 100000,
              min: 1000,
              step: 1000,
            }),
            h("div", { key: "range", className: "oxo-flex oxo-justify-between oxo-text-xs oxo-text-muted" }, [
              h("span", { key: "min" }, "$1K"),
              h("span", { key: "max" }, "$100K"),
            ]),
          ]),

          // Time per Bad Lead
          h("div", { key: "timePerBadLead", className: "oxo-space-y-3 md:oxo-col-span-2 lg:oxo-col-span-1" }, [
            h("label", { key: "label", className: "oxo-text-sm oxo-font-medium" }, "Time Spent per Bad Lead (minutes)"),
            h("div", { key: "value", className: "oxo-input-display" }, `${inputs.timePerBadLead} min`),
            h(Slider, {
              key: "slider",
              value: [inputs.timePerBadLead],
              onValueChange: (value) => updateInput("timePerBadLead", value),
              max: 30,
              min: 5,
              step: 1,
            }),
            h("div", { key: "range", className: "oxo-flex oxo-justify-between oxo-text-xs oxo-text-muted" }, [
              h("span", { key: "min" }, "5 min"),
              h("span", { key: "max" }, "30 min"),
            ]),
          ]),
        ]),
      ),
    ]),

    // Before/After Comparison
    h("div", { key: "comparison", className: "oxo-grid oxo-grid-cols-1 lg:oxo-grid-cols-2 oxo-gap-6" }, [
      // Current Situation
      h(Card, { key: "current", className: "oxo-border-destructive" }, [
        h(
          CardHeader,
          { key: "header" },
          h(CardTitle, { className: "oxo-flex oxo-items-center oxo-gap-2 oxo-text-destructive" }, [
            h(XCircle, { key: "icon" }),
            "Current Situation",
          ]),
        ),
        h(CardContent, { key: "content", className: "oxo-space-y-4" }, [
          h("div", { key: "wasted-cost", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Monthly wasted lead cost"),
            h(
              "span",
              { key: "value", className: "oxo-font-semibold oxo-text-destructive" },
              formatCurrency(wastedCostOnBouncedLeads),
            ),
          ]),
          h("div", { key: "wasted-time", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Monthly wasted time cost"),
            h(
              "span",
              { key: "value", className: "oxo-font-semibold oxo-text-destructive" },
              formatCurrency(timeWasted),
            ),
          ]),
          h("div", { key: "revenue", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Monthly revenue"),
            h("span", { key: "value", className: "oxo-font-semibold" }, formatCurrency(currentRevenue)),
          ]),
          h("div", { key: "bounce", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Bounce rate"),
            h(Badge, { key: "value", variant: "destructive" }, formatPercent(inputs.bounceRate)),
          ]),
          h("div", { key: "conversion", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Conversion rate"),
            h(Badge, { key: "value", variant: "outline" }, formatPercent(inputs.conversionRate)),
          ]),
        ]),
      ]),

      // With Oxo
      h(Card, { key: "oxo", className: "oxo-border-primary" }, [
        h(
          CardHeader,
          { key: "header" },
          h(CardTitle, { className: "oxo-flex oxo-items-center oxo-gap-2 oxo-text-primary" }, [
            h(CheckCircle, { key: "icon" }),
            "With Oxo",
          ]),
        ),
        h(CardContent, { key: "content", className: "oxo-space-y-4" }, [
          h("div", { key: "wasted-cost", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Monthly wasted lead cost"),
            h(
              "span",
              { key: "value", className: "oxo-font-semibold oxo-text-primary" },
              formatCurrency(oxoflyWastedCost),
            ),
          ]),
          h("div", { key: "wasted-time", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Monthly wasted time cost"),
            h(
              "span",
              { key: "value", className: "oxo-font-semibold oxo-text-primary" },
              formatCurrency(oxoflyTimeWasted),
            ),
          ]),
          h("div", { key: "revenue", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Monthly revenue"),
            h("span", { key: "value", className: "oxo-font-semibold oxo-text-primary" }, formatCurrency(oxoflyRevenue)),
          ]),
          h("div", { key: "bounce", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Bounce rate"),
            h(Badge, { key: "value", className: "oxo-bg-primary oxo-text-white" }, formatPercent(oxoflyBounceRate)),
          ]),
          h("div", { key: "conversion", className: "oxo-flex oxo-justify-between oxo-items-center" }, [
            h("span", { key: "label", className: "oxo-text-sm oxo-text-muted" }, "Conversion rate"),
            h(Badge, { key: "value", className: "oxo-bg-primary oxo-text-white" }, formatPercent(oxoflyConversionRate)),
          ]),
        ]),
      ]),
    ]),

    // ROI Results
    h(
      "div",
      { key: "results", className: "oxo-grid oxo-grid-cols-1 md:oxo-grid-cols-2 lg:oxo-grid-cols-4 oxo-gap-4" },
      [
        h(
          Card,
          { key: "monthly-savings" },
          h(CardContent, { className: "oxo-p-6" }, [
            h("div", { key: "header", className: "oxo-flex oxo-items-center oxo-gap-2 oxo-mb-2" }, [
              h(DollarSign, { key: "icon" }),
              h("span", { key: "label", className: "oxo-text-sm oxo-font-medium oxo-text-muted" }, "Monthly Savings"),
            ]),
            h(
              "div",
              { key: "value", className: "oxo-text-2xl oxo-font-bold oxo-text-primary" },
              formatCurrency(monthlySavings),
            ),
          ]),
        ),

        h(
          Card,
          { key: "annual-roi" },
          h(CardContent, { className: "oxo-p-6" }, [
            h("div", { key: "header", className: "oxo-flex oxo-items-center oxo-gap-2 oxo-mb-2" }, [
              h(TrendingUp, { key: "icon" }),
              h("span", { key: "label", className: "oxo-text-sm oxo-font-medium oxo-text-muted" }, "Annual ROI"),
            ]),
            h(
              "div",
              { key: "value", className: "oxo-text-2xl oxo-font-bold oxo-text-primary" },
              formatCurrency(annualROI),
            ),
          ]),
        ),

        h(
          Card,
          { key: "payback" },
          h(CardContent, { className: "oxo-p-6" }, [
            h("div", { key: "header", className: "oxo-flex oxo-items-center oxo-gap-2 oxo-mb-2" }, [
              h(Clock, { key: "icon" }),
              h("span", { key: "label", className: "oxo-text-sm oxo-font-medium oxo-text-muted" }, "Payback Period"),
            ]),
            h(
              "div",
              { key: "value", className: "oxo-text-2xl oxo-font-bold oxo-text-primary" },
              `${paybackPeriod.toFixed(1)} months`,
            ),
          ]),
        ),

        h(
          Card,
          { key: "revenue-increase" },
          h(CardContent, { className: "oxo-p-6" }, [
            h("div", { key: "header", className: "oxo-flex oxo-items-center oxo-gap-2 oxo-mb-2" }, [
              h(TrendingUp, { key: "icon" }),
              h("span", { key: "label", className: "oxo-text-sm oxo-font-medium oxo-text-muted" }, "Revenue Increase"),
            ]),
            h(
              "div",
              { key: "value", className: "oxo-text-2xl oxo-font-bold oxo-text-primary" },
              formatCurrency(revenueIncrease),
            ),
            h("div", { key: "subtitle", className: "oxo-text-xs oxo-text-muted" }, "per month"),
          ]),
        ),
      ],
    ),

    // Call to Action
    h(
      Card,
      { key: "cta", className: "oxo-bg-primary oxo-text-white" },
      h(CardContent, { className: "oxo-p-8 oxo-text-center" }, [
        h("h3", { key: "title", className: "oxo-text-2xl oxo-font-bold oxo-mb-4" }, "Ready to Unlock These Savings?"),
        h(
          "p",
          { key: "description", className: "oxo-text-white/90 oxo-mb-6 oxo-max-w-2xl oxo-mx-auto" },
          "Join thousands of businesses that have transformed their lead generation with Oxo's verified database.",
        ),
        h(
          Button,
          {
            key: "button",
            size: "lg",
            variant: "secondary",
            className: "oxo-bg-white oxo-text-primary hover:oxo-bg-white/90",
          },
          "Get Started with Oxo",
        ),
      ]),
    ),
  ])
}

function initOxoROICalculator(containerId = "oxo-roi-calculator") {
  const container = document.getElementById(containerId)
  if (container && ReactDOM) {
    ReactDOM.render(h(ROICalculator), container)
  } else {
    console.error("Container not found or ReactDOM not available")
  }
}

// Auto-initialize if container exists
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initOxoROICalculator())
} else {
  initOxoROICalculator()
}

// Export for manual initialization
window.OxoROICalculator = {
  init: initOxoROICalculator,
  component: ROICalculator,
}
