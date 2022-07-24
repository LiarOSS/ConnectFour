enum Unit {
    B = 'B',
    kB = 'kB',
    MB = 'MB',
    GB = 'GB',
    TB = 'TB',
}

interface usageFormatted {
    amount: number,
    unit: Unit
}

const units = [Unit.B, Unit.kB, Unit.MB, Unit.GB, Unit.TB]

export function usageFormatter(usage: number): usageFormatted {
    let newUsage;
    for (const unit of units) {
        newUsage = newUsage ? Math.round(newUsage / 1000) : usage;
        if (newUsage < 1000) {
            return {
                amount: newUsage,
                unit
            }
        }
    }
    return {
        amount: newUsage || 0,
        unit: Unit.TB
    }
}