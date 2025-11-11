def open_telemetry_force_dynamic_linkage(installer)
    dynamic_frameworks = [
        'OpenTelemetry-Swift-Sdk',
        'OpenTelemetry-Swift-Api',
        'OpenTelemetry-Swift-Protocol-Exporter-Http',
        'OpenTelemetry-Swift-SdkResourceExtension'
    ]
    installer.pod_targets.each do |pod|
        if dynamic_frameworks.include?(pod.name)
            def pod.build_type;
                Pod::BuildType.dynamic_framework
            end
        end
    end
end
