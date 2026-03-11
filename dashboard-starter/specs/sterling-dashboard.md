# Sterling Finance Dashboard - Specification

## Overview
The Sterling Finance Dashboard provides real-time visibility into the auto-bidding system's performance, revenue generation, and strategic configuration for the Beelancer freelance marketplace platform.

## Features

### 1. Bid History with Win/Loss Ratio

**Data Display:**
- Interactive table with columns: Date/Time, Job, Status (Won/Lost/P Title, Bid Amountending), Honey Earned, Competition Count
- Filterable by: date range, status, job category, honey range
- Sortable by any column (default: newest first)

**Metrics Cards:**
- Total Bids Placed (count)
- Win Rate (percentage with color coding: green >40%, yellow 20-40%, red <20%)
- Average Bid Amount (honey)
- Streak counter (consecutive wins/losses)

**Visualizations:**
- Win/Loss pie chart (last 30 days)
- Win rate trend line (last 90 days, weekly aggregation)
- Bid amount vs. winning threshold scatter plot

### 2. Revenue Tracking (Honey Earned Over Time)

**Metrics Cards:**
- Total Honey Earned (all-time)
- Honey This Month
- Honey Last Month
- Month-over-Month Change (percentage with arrow indicator)

**Visualizations:**
- Area chart: Honey earned over time (daily, weekly, monthly toggle)
- Bar chart: Monthly comparison (current year)
- Heatmap: Activity by day of week/hour (shows peak earning times)

**Revenue Breakdown:**
- Table: Top 5 most profitable job categories
- Average honey per win by category

### 3. Market Opportunity Scanner

**Active Opportunities Panel:**
- List of relevant jobs matching configured criteria
- Columns: Job Title, Posted Age, Budget Range, Competition Level (Low/Medium/High), Match Score (%)
- Quick-action buttons: "Place Bid" / "Ignore"

**Opportunity Insights:**
- Best posting times (heatmap)
- Category demand trends (rising/falling)
- Average winning bid by category
- Recommended bid range for each opportunity

**Filters:**
- Minimum budget threshold
- Maximum competition level
- Job categories (multi-select)
- Skills required matching

### 4. Auto-Bid Strategy Configuration

**Strategy Presets:**
- Dropdown to select: Conservative / Balanced / Aggressive / Custom
- Each preset pre-fills values below

**Configuration Options:**

*Budget Parameters:*
- Maximum bid amount (honey)
- Minimum profit margin (%)
- Daily bid limit (count)
- Monthly budget cap (honey)

*Bidding Rules:*
- Auto-bid on jobs matching skills (toggle)
- Bid below asking price by (%, slider 5-30%)
- Minimum competition threshold to auto-bid
- Minimum job budget threshold
- Exclude categories (multi-select tags)

*Timing:*
- Bid immediately on new matching jobs (toggle)
- Delay between bids (seconds)
- Active hours (start time - end time picker)

**Strategy Performance Preview:**
- Simulated results based on last 30 days' data
- Projected win rate and honey earnings

**Controls:**
- Save Strategy button
- Reset to Defaults button
- Test Strategy (dry run) button

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  STERLING FINANCE                                           │
│  Auto-Bidding Dashboard                    [Settings Gear] │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Total Bids│ │ Win Rate │ │Honey Earn│ │ Avg Bid │        │
│  │    247   │ │   42%    │ │  1,450h  │ │  12.5h  │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────────────────┤
│  [Bid History] [Revenue] [Opportunities] [Strategy]         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Tab Content Area                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Color Palette
- Primary: `#F59E0B` (Amber - honey theme)
- Secondary: `#1F2937` (Dark gray)
- Accent: `#10B981` (Emerald - success/wins)
- Error: `#EF4444` (Red - losses)
- Background: `#0F172A` (Slate 900)
- Card Background: `#1E293B` (Slate 800)
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`

## Acceptance Criteria
1. Dashboard loads within 2 seconds
2. All metrics update in real-time (polling every 30s)
3. Win/loss ratio accurately reflects bid history data
4. Revenue charts display correct honey amounts
5. Strategy changes persist after page refresh
6. Mobile-responsive layout (stacks vertically on <768px)
7. All interactive elements have hover/focus states
