local Functions = {}

local compareIgnoreList = {
    'limit',
    'model',
}

local function TableClone(transfer, template)
    local proxy = table.clone(template)
    for index, value in template do
        if typeof(value) == 'table' then

            if transfer[index] and transfer[index][1] then -- used to check arrays (maybe rewrite later)
                proxy[index] = transfer[index]
                continue
            end

            proxy[index] = TableClone(transfer, value)
        elseif transfer[index] then
            proxy[index] = transfer[index]
        end
    end
    --print(transfer, proxy)
    return proxy
end

local function TransferTable(target, transfer)
    for index, value in target do
        if typeof(value) == 'table' then

            if value[1] then -- used to check arrays (maybe rewrite later)
                transfer[index] = value
                continue
            end

            TransferTable(value, transfer)
            --transferValues[index] = TransferTable(value)
        else
            transfer[index] = value
        end
    end

    return transfer
end

local function CompareTables(t1, t2, useIgnore)
    local checks = true
    for index, value in t1 do

        if useIgnore and table.find(compareIgnoreList, index) ~= nil and t2[index] ~= nil then continue end

        if typeof(value) == 'table' and typeof(t2[index]) == 'table' then
            checks = checks and CompareTables(t1[index], t2[index])
        else
            checks = checks and (value == t2[index])
        end

    end
    
    return checks
end

Functions.constuctData = function(target, template)
    return TableClone(TransferTable(target, {}), template)
end

Functions.iterateObject = function(object, callback)
    for index, value in object do
        callback(index, value)
    end
end

Functions.compareObjects = function(obj1, obj2)
    return CompareTables(obj1, obj2)
end

return Functions